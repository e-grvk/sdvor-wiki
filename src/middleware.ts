// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateAdmin } from "@/lib/auth/admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Для всех админских роутов
  if (pathname.startsWith("/admin")) {
    try {
      await validateAdmin();
    } catch (error) {
      const redirectUrl = new URL("/login", request.nextUrl.origin);
      redirectUrl.searchParams.set("error", "auth_required");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
