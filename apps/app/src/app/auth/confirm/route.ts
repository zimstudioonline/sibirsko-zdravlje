import { type EmailOtpType, createSupabaseServerClient } from "@repo/auth/server";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Potvrda email linkova preko token_hash-a — fallback za projekte sa
 * prilagođenim email šablonima ({{ .TokenHash }} umesto ConfirmationURL).
 * Podrazumevani šabloni idu kroz /auth/callback (?code=...).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next") ?? "/dashboard";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";

  if (tokenHash && type) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      // recovery link vodi na promenu lozinke
      return NextResponse.redirect(`${origin}${type === "recovery" ? "/reset-password" : next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("Link za potvrdu nije važeći ili je istekao.")}`,
  );
}
