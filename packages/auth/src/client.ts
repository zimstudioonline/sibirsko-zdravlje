import { clientEnv } from "@repo/config/env";
import { createBrowserClient } from "@supabase/ssr";

/** Supabase klijent za Client Components (browser). */
export function createSupabaseBrowserClient() {
  const env = clientEnv();
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
