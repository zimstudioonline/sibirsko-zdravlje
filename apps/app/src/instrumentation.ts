/**
 * Pokreće se na startu servera — env validacija puca ODMAH ako fali ključ,
 * a ne tek kad prvi korisnik pogodi rutu.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { assertEnv } = await import("@repo/config/env");
    assertEnv();
  }
}
