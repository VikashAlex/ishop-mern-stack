import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const adminToken = req.cookies.get("admin_token")?.value;

  // 1️⃣ Admin-login page ka alag logic
  if (pathname === "/admin-login") {
    // Agar token hai to login page pe rehne ka koi sense nahi → /admin bhej do
    if (adminToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    // Token nahi hai → login page dikhne do
    return NextResponse.next();
  }

  // 2️⃣ Baaki saare admin routes protect karo
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  // 3️⃣ Jo bhi bacha sab normal jaane do
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/admin-login"],
};
