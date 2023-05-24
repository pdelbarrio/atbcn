import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data: session } = await supabase.auth.getSession();

  console.log("data session", session?.session);

  if (session?.session) {
    // Authentication successful, forward request to protected route.
    return res;
  }

  // Auth condition not met, redirect to login page.FIRST TRY,
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/login";

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: "/add-event",
};
