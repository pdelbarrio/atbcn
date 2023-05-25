// import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: any) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareSupabaseClient({ req, res });
//   const { data: session } = await supabase.auth.getSession();

//   console.log("data session", session?.session);

//   if (session?.session) {
//     // Authentication successful, forward request to protected route.
//     return res;
//   }

//   // Auth condition not met, redirect to login page.FIRST TRY,
//   const redirectUrl = req.nextUrl.clone();
//   redirectUrl.pathname = "/login";
//   redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname); //No se  si esto sirve
//   return NextResponse.redirect(redirectUrl);
// }

// export const config = {
//   matcher: "/add-event",
// };

// export function middleware(req: NextRequest) {
//   console.log("isAuth?", req.cookies.has("supabase-auth-token"));

//   return NextResponse.next();
// }

export function middleware(req: NextRequest) {
  console.log("supabase-auth-token", req.cookies.has("supabase-auth-token"));

  if (req.cookies.has("supabase-auth-token")) {
    return NextResponse.next();
  }

  // const redirectUrl = req.nextUrl.clone();

  // redirectUrl.pathname = "/login";

  // return NextResponse.redirect(redirectUrl);
  return NextResponse.rewrite(new URL("/login", req.url));
}

export const config = {
  matcher: "/add-event",
};
