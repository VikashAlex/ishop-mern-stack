import { NextResponse } from "next/server";

export function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // kuch match hi nahi karega
};
