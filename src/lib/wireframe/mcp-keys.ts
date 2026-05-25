import { createClient } from "@/lib/supabase/client";

// Browser-side helpers for the wireframe MCP key list. Plaintext tokens are
// only ever returned from the `mint` call; thereafter, only the prefix +
// metadata are readable. SHA-256 hashes live server-side.

export interface McpKeyRow {
  id: string;
  label: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

export interface MintedMcpKey {
  id: string;
  token: string;
  key_prefix: string;
  label: string;
}

export async function listMcpKeys(): Promise<McpKeyRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wireframe_mcp_keys")
    .select("id, label, key_prefix, created_at, last_used_at, revoked_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as McpKeyRow[];
}

export async function mintMcpKey(label: string): Promise<MintedMcpKey> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("mint_wireframe_mcp_key", {
    p_label: label,
  });
  if (error) throw error;
  if (!data) throw new Error("Mint returned no payload");
  return data as MintedMcpKey;
}

export async function revokeMcpKey(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc("revoke_wireframe_mcp_key", {
    p_id: id,
  });
  if (error) throw error;
}
