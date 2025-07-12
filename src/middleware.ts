import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that are accessible without a token
  const isPublicPath = path === "/login" || path === "/signup" || path === "/";

  // Use getToken to decode the NextAuth.js JWT cookie
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 1. Redirect logged-in users from public pages (like /login) to the dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  // 2. Redirect unauthenticated users from protected pages to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  // 3. Allow the request to proceed if no redirect is needed
  return NextResponse.next();
}

// This config specifies which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
