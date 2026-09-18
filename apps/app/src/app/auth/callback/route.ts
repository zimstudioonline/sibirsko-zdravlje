import { createSupabaseServerClient } from "@repo/auth/server";
import { type NextRequest, NextResponse } from "next/server";

/**
 * OAuth / email-link callback (PKCE): Supabase vraća korisnika ovde sa
 * ?code=..., mi ga menjamo za sesiju i vodimo dalje (?next=/ruta).
 * Koristi se za: Google prijavu, potvrdu registracije, reset lozinke.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/dashboard";
  // Samo interne putanje — sprečava open-redirect.
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("Link nije važeći ili je istekao.")}`,
  );
}
