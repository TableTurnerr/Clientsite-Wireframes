import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BRAND_PRESETS, makeDefaultConfig } from "@/config/defaults";
import { STORE_VERSION, type SerializedState } from "@/config/store";
import type { ConfigData, ThemeConfig } from "@/config/types";
import { WIRE_PAGES } from "@/canvas/pages";

// ---------------------------------------------------------------------------
// Data access helpers (service-role; bypass RLS)
// ---------------------------------------------------------------------------

interface ClientRow {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  updated_at: string;
}

async function resolveClient(
  supabase: SupabaseClient,
  idOrSlug: string,
): Promise<ClientRow> {
  // Try slug first (more user-friendly when models pass strings like "al-baghdady").
  const uuidLike = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const query = supabase
    .from("clients")
    .select("id, name, slug, url, updated_at");
  const { data, error } = uuidLike.test(idOrSlug)
    ? await query.eq("id", idOrSlug).maybeSingle()
    : await query.eq("slug", idOrSlug).maybeSingle();
  if (error) throw new Error(`Failed to resolve canvas "${idOrSlug}": ${error.message}`);
  if (!data) throw new Error(`No canvas found for "${idOrSlug}". Call list_canvases to see available ids/slugs.`);
  return data as ClientRow;
}

async function loadContent(
  supabase: SupabaseClient,
  clientId: string,
): Promise<SerializedState> {
  const { data, error } = await supabase
    .from("wireframe_content")
    .select("content")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw new Error(`Failed to load canvas content: ${error.message}`);
  if (!data) {
    // Lazy-seed default so an empty client row is still editable.
    const fresh = makeDefaultConfig();
    return { version: STORE_VERSION, theme: fresh.theme, data: fresh.data };
  }
  return data.content as SerializedState;
}

async function saveContent(
  supabase: SupabaseClient,
  clientId: string,
  content: SerializedState,
): Promise<void> {
  const { error } = await supabase
    .from("wireframe_content")
    .upsert(
      {
        client_id: clientId,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id" },
    );
  if (error) throw new Error(`Failed to save canvas content: ${error.message}`);
}

function ok(payload: unknown): { content: { type: "text"; text: string }[] } {
  return {
    content: [
      { type: "text", text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2) },
    ],
  };
}

// Apply a single mutation to the canvas (load → mutate → save) and return the
// mutated `data` slice the caller asked for, so the model sees what changed.
async function mutate<T>(
  supabase: SupabaseClient,
  idOrSlug: string,
  fn: (s: SerializedState) => T,
): Promise<{ canvas: ClientRow; result: T }> {
  const canvas = await resolveClient(supabase, idOrSlug);
  const state = await loadContent(supabase, canvas.id);
  const result = fn(state);
  await saveContent(supabase, canvas.id, state);
  return { canvas, result };
}

// ---------------------------------------------------------------------------
// Tool registration
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, supabase: SupabaseClient) {
  // -----------------------------------------------------------------------
  // Read tools
  // -----------------------------------------------------------------------

  server.tool(
    "list_canvases",
    "List every wireframe canvas (one per client). Returns id, slug, name, url, updated_at. Use the id or slug to address a canvas in other tools.",
    {},
    async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, slug, url, updated_at")
        .order("name", { ascending: true });
      if (error) throw new Error(error.message);
      return ok({ canvases: data ?? [] });
    },
  );

  server.tool(
    "get_canvas",
    "Read the full content of a canvas (theme + data + per-frame overrides). Pass either the canvas id (uuid) or its slug (e.g. 'al-baghdady').",
    { idOrSlug: z.string().describe("Canvas id (uuid) or slug.") },
    async ({ idOrSlug }) => {
      const canvas = await resolveClient(supabase, idOrSlug);
      const state = await loadContent(supabase, canvas.id);
      return ok({ canvas, content: state });
    },
  );

  server.tool(
    "list_pages",
    "List every page rendered in the canvas (the real client-site pages: home, menu, bakery, etc). Returns id, title, route, group. Useful for figuring out the frameId to target with set_override.",
    {},
    async () => {
      const pages = WIRE_PAGES.map((p) => ({
        id: p.id,
        title: p.title,
        route: p.route,
        group: p.group,
      }));
      return ok({ pages });
    },
  );

  server.tool(
    "describe_schema",
    "Return the editable canvas schema: keys under restaurant/copy, the menu/faqs/reviews shapes, theme color names, brand preset ids, and how overrides work. Read this first if you're unsure what fields exist.",
    {},
    async () => {
      const fresh = makeDefaultConfig();
      return ok({
        version: STORE_VERSION,
        theme: {
          colors: Object.keys(fresh.theme.colors),
          fonts: ["fontDisplay", "fontBody", "fontAccent"],
          canvasBg: "string (hex)",
        },
        data: {
          restaurant: Object.keys(fresh.data.restaurant),
          copy: Object.keys(fresh.data.copy),
          menu: "MenuCategory[] — each has { id, name, items: { id, name, description?, price, ... }[] }",
          faqs: "FAQ[] — each has { q, a }",
          reviews: "Review[] — each has { author, rating, text, source? }",
          specialties: "Specialty[]",
          neighborhoods: "Neighborhood[]",
          dishes: "Dish[]",
        },
        overrides: {
          shape: "{ [frameId]: { [nodePath]: htmlString } }",
          notes:
            "Frame ids match the canvas page ids (call list_pages). nodePath is a stable DOM path emitted by the inline-edit layer; only use this if you've already inspected an existing override's path.",
        },
        brandPresetIds: BRAND_PRESETS.map((p) => p.id),
        sampleRestaurant: fresh.data.restaurant,
        sampleCopy: fresh.data.copy,
      });
    },
  );

  // -----------------------------------------------------------------------
  // Content mutation tools (data tier)
  // -----------------------------------------------------------------------

  server.tool(
    "update_restaurant",
    "Partially merge fields into the restaurant block (brand, address, phone, hours, socials, etc). Only the keys you pass are touched. Nested objects (address, geo, hours) are also shallow-merged.",
    {
      idOrSlug: z.string(),
      patch: z.record(z.string(), z.any()).describe("Object of restaurant fields to overwrite."),
    },
    async ({ idOrSlug, patch }) => {
      const { canvas, result } = await mutate(supabase, idOrSlug, (s) => {
        const r = s.data.restaurant as Record<string, unknown>;
        for (const [k, v] of Object.entries(patch)) {
          const existing = r[k];
          if (
            existing &&
            typeof existing === "object" &&
            !Array.isArray(existing) &&
            v &&
            typeof v === "object" &&
            !Array.isArray(v)
          ) {
            r[k] = { ...(existing as object), ...(v as object) };
          } else {
            r[k] = v;
          }
        }
        return s.data.restaurant;
      });
      return ok({ canvas: canvas.slug, restaurant: result });
    },
  );

  server.tool(
    "update_copy",
    "Partially merge fields into the homepage marketing copy (homeHeroLead, homeHeroAccent, etc). See describe_schema for available keys.",
    {
      idOrSlug: z.string(),
      patch: z.record(z.string(), z.any()),
    },
    async ({ idOrSlug, patch }) => {
      const { canvas, result } = await mutate(supabase, idOrSlug, (s) => {
        Object.assign(s.data.copy as Record<string, unknown>, patch);
        return s.data.copy;
      });
      return ok({ canvas: canvas.slug, copy: result });
    },
  );

  const arrayTool = (
    name: keyof Pick<
      ConfigData,
      "menu" | "faqs" | "reviews" | "specialties" | "neighborhoods" | "dishes"
    >,
    description: string,
  ) => {
    server.tool(
      `set_${name}`,
      description,
      {
        idOrSlug: z.string(),
        items: z.array(z.any()).describe(`New ${name} array (full replace).`),
      },
      async ({ idOrSlug, items }) => {
        const { canvas } = await mutate(supabase, idOrSlug, (s) => {
          (s.data as unknown as Record<string, unknown>)[name] = items;
        });
        return ok({ canvas: canvas.slug, [name]: items.length });
      },
    );
  };

  arrayTool("menu", "Replace the full menu (array of MenuCategory). Each category has id, name, and items[].");
  arrayTool("faqs", "Replace the full FAQs array. Each entry: { q, a }.");
  arrayTool("reviews", "Replace the full reviews array. Each entry: { author, rating, text, source? }.");
  arrayTool("specialties", "Replace the full specialties array (drives Specialties hub + topic pages).");
  arrayTool("neighborhoods", "Replace the full neighborhoods array (drives the Near/<city> pages).");
  arrayTool("dishes", "Replace the full dishes array (drives the dish×city mesh pages).");

  // -----------------------------------------------------------------------
  // Theme mutation tools
  // -----------------------------------------------------------------------

  server.tool(
    "apply_theme",
    "Patch the theme: colors (any subset of the 11 color keys), font stacks (fontDisplay/fontBody/fontAccent), and/or canvasBg. Unset keys are preserved.",
    {
      idOrSlug: z.string(),
      colors: z.record(z.string(), z.string()).optional(),
      fontDisplay: z.string().optional(),
      fontBody: z.string().optional(),
      fontAccent: z.string().optional(),
      canvasBg: z.string().optional(),
    },
    async ({ idOrSlug, colors, fontDisplay, fontBody, fontAccent, canvasBg }) => {
      const { canvas, result } = await mutate(supabase, idOrSlug, (s) => {
        const t = s.theme as ThemeConfig;
        if (colors) t.colors = { ...t.colors, ...(colors as Partial<typeof t.colors>) };
        if (fontDisplay) t.fontDisplay = fontDisplay;
        if (fontBody) t.fontBody = fontBody;
        if (fontAccent) t.fontAccent = fontAccent;
        if (canvasBg) t.canvasBg = canvasBg;
        return s.theme;
      });
      return ok({ canvas: canvas.slug, theme: result });
    },
  );

  server.tool(
    "apply_brand_preset",
    "Apply a full brand kit (palette + fonts) by id. Use describe_schema to see available preset ids. Does NOT change canvasBg (the board background is a tool setting, not client branding).",
    {
      idOrSlug: z.string(),
      presetId: z.string(),
    },
    async ({ idOrSlug, presetId }) => {
      const preset = BRAND_PRESETS.find((p) => p.id === presetId);
      if (!preset) throw new Error(`Unknown preset "${presetId}". Available: ${BRAND_PRESETS.map((p) => p.id).join(", ")}`);
      const { canvas, result } = await mutate(supabase, idOrSlug, (s) => {
        s.theme.colors = { ...preset.colors };
        s.theme.fontDisplay = preset.fontDisplay;
        s.theme.fontBody = preset.fontBody;
        s.theme.fontAccent = preset.fontAccent;
        return s.theme;
      });
      return ok({ canvas: canvas.slug, applied: presetId, theme: result });
    },
  );

  // -----------------------------------------------------------------------
  // Per-frame override tools
  // -----------------------------------------------------------------------

  server.tool(
    "set_override",
    "Pin a specific HTML string at a frame+nodePath. Only use this when you already know the nodePath from an existing override or from inspecting the canvas; prefer update_restaurant/update_copy/set_menu for global content. Pass plain HTML; B/I/U markup will be preserved.",
    {
      idOrSlug: z.string(),
      frameId: z.string().describe("Canvas page id (see list_pages)."),
      nodePath: z.string().describe("Stable DOM path within the frame, as emitted by the inline-edit layer."),
      html: z.string().describe("HTML string to display at that path. Plain text is also accepted."),
    },
    async ({ idOrSlug, frameId, nodePath, html }) => {
      const { canvas } = await mutate(supabase, idOrSlug, (s) => {
        const forFrame = s.data.overrides[frameId] ?? {};
        forFrame[nodePath] = html;
        s.data.overrides[frameId] = forFrame;
      });
      return ok({ canvas: canvas.slug, frameId, nodePath, html });
    },
  );

  server.tool(
    "clear_overrides",
    "Remove overrides. Pass a frameId to clear just that frame's overrides, or omit it to wipe every override on the canvas.",
    {
      idOrSlug: z.string(),
      frameId: z.string().optional(),
    },
    async ({ idOrSlug, frameId }) => {
      const { canvas } = await mutate(supabase, idOrSlug, (s) => {
        if (frameId) delete s.data.overrides[frameId];
        else s.data.overrides = {};
      });
      return ok({ canvas: canvas.slug, cleared: frameId ?? "all" });
    },
  );

  // -----------------------------------------------------------------------
  // Escape hatch
  // -----------------------------------------------------------------------

  server.tool(
    "replace_canvas",
    "Overwrite the entire SerializedState ({ version, theme, data }) for a canvas. Dangerous — prefer the targeted tools above. Useful when you've fetched a canvas with get_canvas, modified the blob locally, and want to write it back atomically.",
    {
      idOrSlug: z.string(),
      content: z.object({
        version: z.number(),
        theme: z.any(),
        data: z.any(),
      }),
    },
    async ({ idOrSlug, content }) => {
      const canvas = await resolveClient(supabase, idOrSlug);
      await saveContent(supabase, canvas.id, content as SerializedState);
      return ok({ canvas: canvas.slug, replaced: true });
    },
  );
}
