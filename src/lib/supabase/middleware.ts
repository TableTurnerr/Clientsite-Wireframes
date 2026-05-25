import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { withSharedDomain } from "./cookie-options";

/**
 * Refreshes the Supabase session cookie on every request and enforces auth.
 * Anonymous visitors are bounced to the central auth host
 * (NEXT_PUBLIC_AUTH_URL), with `next` set to the absolute URL they tried to
 * reach so they're returned here after signing in.
 */
export async function updateSession(request: NextRequest) {
  // The MCP endpoint authenticates with its own Bearer-token scheme
  // (see src/app/api/mcp/route.ts) and must not be bounced to the central
  // auth host — AI clients don't carry a Supabase session cookie.
  if (request.nextUrl.pathname.startsWith("/api/mcp")) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, withSharedDomain(options)),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    if (!authUrl) {
      // Auth host not configured — let the page render. Useful in dev where
      // there's no central auth running and the wireframes are public.
      return supabaseResponse;
    }
    const returnTo = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      request.nextUrl.origin,
    ).toString();
    const loginUrl = new URL("/login", authUrl);
    loginUrl.searchParams.set("next", returnTo);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}
