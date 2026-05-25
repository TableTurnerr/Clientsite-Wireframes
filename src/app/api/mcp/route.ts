import { createHash } from "node:crypto";
import { createMcpHandler, withMcpAuth } from "mcp-handler";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServiceClient } from "@/lib/supabase/service";
import { registerTools } from "./tools";

// MCP server endpoint for AI agents (Claude, Cursor, etc.) to read and edit
// wireframe canvases. Auth via per-team Bearer tokens minted in the
// "Connect AI" panel; tokens are SHA-256 hashed at rest, so leaking the row
// doesn't leak the secret.

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Lazy service-role client. Constructing eagerly at module load breaks
// `next build`'s page-data collection (env vars aren't injected yet). The
// handler creates it on first request and reuses the singleton thereafter.
let supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!supabase) supabase = createServiceClient();
  return supabase;
}

const handler = createMcpHandler(
  (server) => registerTools(server, getSupabase()),
  {
    serverInfo: { name: "tt-wireframe", version: "1.0.0" },
    capabilities: { tools: {} },
  },
  {
    basePath: "/api",
    disableSse: true,
    sessionIdGenerator: undefined,
    verboseLogs: false,
  },
);

// Bearer-token verifier. Bumps last_used_at fire-and-forget so the Connect AI
// panel can show "used 2 minutes ago" without blocking the request.
async function verifyToken(_req: Request, bearer?: string) {
  if (!bearer || !bearer.startsWith("ttwf_")) return undefined;
  const hash = createHash("sha256").update(bearer).digest("hex");
  const db = getSupabase();

  const { data, error } = await db
    .from("wireframe_mcp_keys")
    .select("id, label, revoked_at")
    .eq("key_hash", hash)
    .maybeSingle();
  if (error || !data || data.revoked_at) return undefined;

  void db
    .from("wireframe_mcp_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", data.id);

  return {
    token: bearer,
    clientId: data.id,
    scopes: ["wireframe:edit"],
    extra: { label: data.label, keyId: data.id },
  };
}

const authedHandler = withMcpAuth(handler, verifyToken, { required: true });

export { authedHandler as GET, authedHandler as POST, authedHandler as DELETE };
