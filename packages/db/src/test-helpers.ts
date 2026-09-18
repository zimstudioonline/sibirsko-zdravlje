/**
 * Pomoćnici za integracione testove nad LOKALNIM Supabase stackom.
 *
 * Testovi koji pišu u bazu rade isključivo protiv localhost-a — nikad protiv
 * udaljenog projekta. Kad lokalni stack ne radi (npr. u CI), testovi se
 * preskaču (describe.skipIf), pa je `bun test` uvek bezbedan.
 */

export async function localSupabaseUp(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!url.includes("127.0.0.1") && !url.includes("localhost")) {
    return false;
  }
  try {
    const response = await fetch(`${url}/auth/v1/health`, {
      signal: AbortSignal.timeout(1500),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/** Nasumičan email za test naloge (local.test domen ne postoji javno). */
export function testEmail(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}@local.test`;
}
