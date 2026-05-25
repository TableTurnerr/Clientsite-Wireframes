import { createClient } from "@/lib/supabase/client";
import { makeDefaultConfig } from "@/config/defaults";
import {
  STORE_VERSION,
  type SerializedState,
} from "@/config/store";

// Thin typed wrapper around the wireframe_* tables. Centralises shape coercion
// so callers can stay framework-agnostic and avoid sprinkling `as unknown as` casts.

export interface ClientRow {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  updated_at: string;
}

export interface WireframeContentRow {
  client_id: string;
  content: SerializedState;
  version: number;
  updated_at: string;
  updated_by: string | null;
}

// List every client visible to the signed-in team member. RLS on public.clients
// (defined in the parent repo) restricts this to rows the user has access to.
export async function listClients(): Promise<ClientRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, slug, url, updated_at")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ClientRow[];
}

// Fetch the JSONB content blob for a client. Returns null if the row hasn't
// been created yet (a fresh client without a seeded wireframe).
export async function getWireframeContent(
  clientId: string,
): Promise<WireframeContentRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wireframe_content")
    .select("client_id, content, version, updated_at, updated_by")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return data as WireframeContentRow;
}

// Upsert the wireframe content blob. Bumps version + updated_at server-side.
export async function saveWireframeContent(
  clientId: string,
  content: SerializedState,
): Promise<WireframeContentRow> {
  const supabase = createClient();
  const { data: userRes } = await supabase.auth.getUser();
  const updatedBy = userRes.user?.id ?? null;

  const { data, error } = await supabase
    .from("wireframe_content")
    .upsert(
      {
        client_id: clientId,
        content,
        updated_by: updatedBy,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id" },
    )
    .select("client_id, content, version, updated_at, updated_by")
    .single();
  if (error) throw error;
  return data as WireframeContentRow;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Create a new client row + seeded wireframe_content row in one logical step.
// We can't wrap in a server-side transaction from the browser, so we tolerate
// partial failure: if the seed insert fails after the client insert, the row
// still exists and will lazy-seed on first save instead.
export async function createClientProfile(
  name: string,
  options: { slug?: string; url?: string | null } = {},
): Promise<{ client: ClientRow; content: SerializedState }> {
  const supabase = createClient();
  const slug = options.slug ?? toSlug(name);
  if (!slug) throw new Error("Profile name produced an empty slug");

  const { data: userRes } = await supabase.auth.getUser();
  const createdBy = userRes.user?.id ?? null;

  const { data: clientData, error: clientErr } = await supabase
    .from("clients")
    .insert({
      name,
      slug,
      url: options.url ?? "",
      created_by: createdBy,
    })
    .select("id, name, slug, url, updated_at")
    .single();
  if (clientErr) throw clientErr;
  const client = clientData as ClientRow;

  const seed: SerializedState = {
    version: STORE_VERSION,
    theme: makeDefaultConfig().theme,
    data: makeDefaultConfig().data,
  };
  await saveWireframeContent(client.id, seed);
  return { client, content: seed };
}
