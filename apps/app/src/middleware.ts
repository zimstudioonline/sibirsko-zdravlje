import { updateSession } from "@repo/auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

/** Rute dostupne bez prijave. Webhookovi MORAJU ostati javni (potpis ih štiti). */
const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password", "/auth", "/api/webhooks"];

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
