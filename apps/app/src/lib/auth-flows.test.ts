import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { localSupabaseUp, testEmail } from "@repo/db/test-helpers";

/**
 * E2E testovi auth tokova nad LOKALNIM Supabase stackom
 * (`bun run local:setup` pa `bun test`). Bez lokalnog stacka se preskaču.
 *
 * Pokrivaju scenarije koje korisnik stvarno pravi: registracija (i duplikat),
 * prijava (ispravna, pogrešna lozinka, nepostojeći nalog), odjava, promena
 * lozinke i reset lozinke KRAJ-DO-KRAJA kroz lokalno email sanduče (Inbucket).
 */

const up = await localSupabaseUp();
const PASSWORD = "test-lozinka-123!";

describe.skipIf(!up)("auth tokovi (lokalni Supabase stack)", () => {
  // Telo describe-a se izvršava i kad je suite preskočen — klijenti tek u beforeAll.
  let url: string;
  let anonKey: string;
  let admin: SupabaseClient;
  const createdEmails: string[] = [];

  function anonClient(): SupabaseClient {
    return createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  beforeAll(() => {
    url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  });

  afterAll(async () => {
    // Počisti sve naloge koje su testovi napravili.
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    for (const user of data?.users ?? []) {
      if (user.email && createdEmails.includes(user.email)) {
        await admin.auth.admin.deleteUser(user.id);
      }
    }
  });

  test("registracija → odmah sesija (lokalni auto-confirm)", async () => {
    const email = testEmail("signup");
    createdEmails.push(email);

    const { data, error } = await anonClient().auth.signUp({ email, password: PASSWORD });
    expect(error).toBeNull();
    expect(data.session).not.toBeNull();
    expect(data.user?.email).toBe(email);
  });

  test("registracija sa već postojećim emailom je odbijena", async () => {
    const email = testEmail("dup");
    createdEmails.push(email);
    await anonClient().auth.signUp({ email, password: PASSWORD });

    const second = await anonClient().auth.signUp({ email, password: "druga-lozinka-1!" });
    // GoTrue sa auto-confirm vraća grešku; u produkcionom podešavanju odgovor je
    // namerno zamagljen (bez sesije) — pokrivamo oba ponašanja.
    expect(second.error !== null || second.data.session === null).toBe(true);
  });

  test("prijava: ispravna radi, pogrešna lozinka i nepostojeći nalog padaju", async () => {
    const email = testEmail("login");
    createdEmails.push(email);
    await anonClient().auth.signUp({ email, password: PASSWORD });

    const ok = await anonClient().auth.signInWithPassword({ email, password: PASSWORD });
    expect(ok.error).toBeNull();
    expect(ok.data.session).not.toBeNull();

    const wrongPass = await anonClient().auth.signInWithPassword({
      email,
      password: "pogresna-lozinka-1!",
    });
    expect(wrongPass.error).not.toBeNull();
    expect(wrongPass.data.session).toBeNull();

    const noUser = await anonClient().auth.signInWithPassword({
      email: testEmail("ne-postoji"),
      password: PASSWORD,
    });
    expect(noUser.error).not.toBeNull();
  });

  test("odjava poništava sesiju", async () => {
    const email = testEmail("logout");
    createdEmails.push(email);
    const client = anonClient();
    await client.auth.signUp({ email, password: PASSWORD });

    expect((await client.auth.getSession()).data.session).not.toBeNull();
    const { error } = await client.auth.signOut();
    expect(error).toBeNull();
    expect((await client.auth.getSession()).data.session).toBeNull();
  });

  test("promena lozinke: stara prestaje da važi, nova radi", async () => {
    const email = testEmail("promena");
    createdEmails.push(email);
    const newPassword = "nova-lozinka-456!";

    const client = anonClient();
    await client.auth.signUp({ email, password: PASSWORD });
    const { error } = await client.auth.updateUser({ password: newPassword });
    expect(error).toBeNull();

    const oldLogin = await anonClient().auth.signInWithPassword({ email, password: PASSWORD });
    expect(oldLogin.error).not.toBeNull();

    const newLogin = await anonClient().auth.signInWithPassword({ email, password: newPassword });
    expect(newLogin.error).toBeNull();
    expect(newLogin.data.session).not.toBeNull();
  });

  test("reset lozinke kraj-do-kraja: email → link → nova lozinka", async () => {
    const email = testEmail("reset");
    createdEmails.push(email);
    const newPassword = "resetovana-789!";
    await anonClient().auth.signUp({ email, password: PASSWORD });

    // 1) Zahtev za reset — email završava u lokalnom sandučetu (Inbucket).
    const client = anonClient();
    const { error: resetError } = await client.auth.resetPasswordForEmail(email);
    expect(resetError).toBeNull();

    // 2) Izvuci verify link iz email poruke.
    const link = await waitForRecoveryLink(url, email);

    // 3) Prati link (GoTrue verify) — redirect nosi sesiju u fragmentu.
    const response = await fetch(link, { redirect: "manual" });
    const location = response.headers.get("location") ?? "";
    const fragment = new URLSearchParams(location.split("#")[1] ?? "");
    const accessToken = fragment.get("access_token");
    const refreshToken = fragment.get("refresh_token");
    if (!accessToken || !refreshToken) {
      throw new Error(`Verify link nije dao sesiju — redirect: ${location}`);
    }

    // 4) Sa recovery sesijom postavi novu lozinku (isto što radi /reset-password).
    await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    const { error: updateError } = await client.auth.updateUser({ password: newPassword });
    expect(updateError).toBeNull();

    // 5) Stara lozinka pada, nova radi.
    const oldLogin = await anonClient().auth.signInWithPassword({ email, password: PASSWORD });
    expect(oldLogin.error).not.toBeNull();
    const newLogin = await anonClient().auth.signInWithPassword({ email, password: newPassword });
    expect(newLogin.error).toBeNull();
  });
});

/**
 * Pročita recovery email iz lokalnog Inbucket sandučeta i vrati verify link.
 * Port sandučeta je (API port + 3) — raspored portova koji asembler upisuje
 * u supabase/config.toml (api, db, studio, inbucket).
 */
async function waitForRecoveryLink(apiUrl: string, email: string): Promise<string> {
  const inbucketBase = `http://127.0.0.1:${Number(new URL(apiUrl).port) + 3}`;
  const mailboxes = [email.split("@")[0] ?? email, email];

  for (let attempt = 0; attempt < 30; attempt++) {
    for (const mailbox of mailboxes) {
      const listResponse = await fetch(
        `${inbucketBase}/api/v1/mailbox/${encodeURIComponent(mailbox)}`,
      ).catch(() => null);
      if (!listResponse?.ok) {
        continue;
      }
      const list = (await listResponse.json()) as Array<{ id: string }>;
      if (!Array.isArray(list) || list.length === 0) {
        continue;
      }

      const last = list[list.length - 1];
      const message = (await fetch(
        `${inbucketBase}/api/v1/mailbox/${encodeURIComponent(mailbox)}/${last?.id}`,
      ).then((r) => r.json())) as { body?: { text?: string; html?: string } };

      const content = `${message.body?.text ?? ""}\n${message.body?.html ?? ""}`;
      const match = content.match(/https?:\/\/[^\s"'<>]+\/auth\/v1\/verify[^\s"'<>]*/);
      if (match) {
        return match[0].replaceAll("&amp;", "&");
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(
    `Recovery email nije stigao u lokalno sanduče (${inbucketBase}). Proveri da lokalni stack radi.`,
  );
}
