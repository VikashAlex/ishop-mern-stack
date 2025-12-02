import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const adminToken = req.cookies.get("admin_token")?.value;
  if (pathname === "/admin-login" && adminToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (pathname.startsWith("/admin")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
