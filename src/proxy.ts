import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const PROTECTED_PREFIXES = ["/client", "/cabinet", "/candidate"];

export const proxy = auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !req.auth?.user) {
    const callbackUrl = encodeURIComponent(pathname + search);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/client/:path*", "/cabinet/:path*", "/candidate/:path*"],
};
