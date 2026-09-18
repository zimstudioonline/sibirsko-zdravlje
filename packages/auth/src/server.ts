import { clientEnv, serverEnv } from "@repo/config/env";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options: CookieOptions };

export type { EmailOtpType, User } from "@supabase/supabase-js";

/**
 * Supabase klijent za Server Components, Server Actions i Route Handlere.
 * Nosi JWT ulogovanog korisnika iz cookie-ja — RLS važi po korisniku.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const env = clientEnv();

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Poziv iz Server Componente — sesiju osvežava middleware, ovo je bezbedno ignorisati.
        }
      },
    },
  });
}

/**
 * Service-role klijent — zaobilazi RLS! Samo za poverene serverske operacije
 * (webhookovi, admin poslovi). Nikad ga ne uvozi u client kod.
 */
export function createSupabaseAdminClient() {
  const env = clientEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, serverEnv().SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
