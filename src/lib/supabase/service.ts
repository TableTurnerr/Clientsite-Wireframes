import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client that uses the service role key. It bypasses RLS,
// so it must NEVER be imported into a file that ends up in the browser bundle.
// Used by the /api/mcp route to authenticate API keys and mutate wireframe
// content on behalf of an AI agent (no end-user session is available).
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
