import { createClient } from "@/lib/supabase/client";
import { makeDefaultConfig } from "@/config/defaults";
import {
  STORE_VERSION,
  type SerializedState,
} from "@/config/store";

// Thin typed wrapper around the wireframe_* tables. Centralises shape coercion
// so callers can stay framework-agnostic and avoid sprinkling `as unknown as` casts.

export type ClientStatus = "prospect" | "client" | "template";

export interface ClientRow {
  id: string;
  name: string;
  slug: string;
  url: string | null;
  status: ClientStatus;
  updated_at: string;
}

export interface WireframeContentRow {
  client_id: string;
  content: SerializedState;
  version: number;
  updated_at: string;
  updated_by: string | null;
}

// List the profiles the wireframe should surface in its picker. Prospects are
// intentionally hidden here — they live in the parent admin site until they're
// promoted to a client. Templates are surfaced so users can edit the default
// template that seeds new profiles.
export async function listClients(): Promise<ClientRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, slug, url, status, updated_at")
    .in("status", ["client", "template"])
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ClientRow[];
}

// List prospects so the "Add new profile" dialog can offer to promote them.
// Returns rows with status='prospect' only.
export async function listProspects(): Promise<ClientRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, slug, url, status, updated_at")
    .eq("status", "prospect")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ClientRow[];
}

// Flip a prospect to client status. Returns the updated row.
export async function promoteProspectToClient(clientId: string): Promise<ClientRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .update({ status: "client" })
    .eq("id", clientId)
    .select("id, name, slug, url, status, updated_at")
    .single();
  if (error) throw error;
  return data as ClientRow;
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
  options: { slug?: string; url?: string | null; status?: ClientStatus } = {},
): Promise<{ client: ClientRow; content: SerializedState }> {
  const supabase = createClient();
  const slug = options.slug ?? toSlug(name);
  if (!slug) throw new Error("Profile name produced an empty slug");

  const { data: userRes } = await supabase.auth.getUser();
  const createdBy = userRes.user?.id ?? null;

  // Profiles created from the wireframe are real signed clients by default;
  // prospect onboarding happens in the parent admin site.
  const status: ClientStatus = options.status ?? "client";

  const { data: clientData, error: clientErr } = await supabase
    .from("clients")
    .insert({
      name,
      slug,
      url: options.url ?? "",
      created_by: createdBy,
      status,
    })
    .select("id, name, slug, url, status, updated_at")
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
