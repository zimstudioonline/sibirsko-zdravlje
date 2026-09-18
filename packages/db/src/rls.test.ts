import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { localSupabaseUp, testEmail } from "./test-helpers";

/**
 * Integracioni test RLS politika nad LOKALNIM Supabase stackom
 * (`bun run local:setup` pa `bun test`). Bez lokalnog stacka se preskače.
 *
 * Ovo je živa potvrda ključne invarijante: korisnik vidi i menja ISKLJUČIVO
 * svoje podatke, jer politika živi u bazi — ne u kodu aplikacije.
 */

const up = await localSupabaseUp();

describe.skipIf(!up)("RLS na lokalnoj bazi", () => {
  // Telo describe-a se izvršava i kad je suite preskočen — zato se klijenti
  // prave tek u beforeAll (env postoji samo uz lokalni stack).
  let admin: SupabaseClient;
  let alice: SupabaseClient;
  let bob: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let aliceNoteId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const password = "test-lozinka-123!";
    const users = await Promise.all(
      [testEmail("alice"), testEmail("bob")].map(async (email) => {
        const { data, error } = await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });
        if (error || !data.user) {
          throw error ?? new Error("createUser nije uspeo");
        }
        const client = createClient(url, anonKey, { auth: { persistSession: false } });
        const signIn = await client.auth.signInWithPassword({ email, password });
        if (signIn.error) {
          throw signIn.error;
        }
        return { id: data.user.id, client };
      }),
    );
    const [first, second] = users;
    if (!first || !second) {
      throw new Error("Setup nije kreirao oba test korisnika.");
    }
    [aliceId, bobId] = [first.id, second.id];
    [alice, bob] = [first.client, second.client];
  });

  afterAll(async () => {
    // Kaskadno briše i profile/notes (FK on delete cascade).
    await admin.auth.admin.deleteUser(aliceId);
    await admin.auth.admin.deleteUser(bobId);
  });

  test("trigger je kreirao profil pri registraciji", async () => {
    const { data } = await alice.from("profiles").select("id").eq("id", aliceId);
    expect(data).toHaveLength(1);
  });

  test("korisnik ne vidi tuđi profil", async () => {
    const { data } = await bob.from("profiles").select("id").eq("id", aliceId);
    expect(data).toEqual([]);
  });

  test("insert sopstvene beleške prolazi", async () => {
    const { data, error } = await alice
      .from("notes")
      .insert({ user_id: aliceId, content: "Alicina tajna beleška" })
      .select("id")
      .single();
    expect(error).toBeNull();
    aliceNoteId = (data as { id: string }).id;
  });

  test("insert beleške sa TUĐIM user_id pada (with check)", async () => {
    const { error } = await bob.from("notes").insert({
      user_id: aliceId, // Bob pokušava da podmetne belešku Alisi
      content: "podmetnuto",
    });
    expect(error).not.toBeNull();
  });

  test("korisnik ne vidi tuđe beleške", async () => {
    const { data } = await bob.from("notes").select("id").eq("id", aliceNoteId);
    expect(data).toEqual([]);
  });

  test("brisanje tuđe beleške tiho ne briše ništa", async () => {
    await bob.from("notes").delete().eq("id", aliceNoteId);
    const { data } = await alice.from("notes").select("id").eq("id", aliceNoteId);
    expect(data).toHaveLength(1); // i dalje postoji
  });

  test("vlasnik vidi svoju belešku", async () => {
    const { data } = await alice.from("notes").select("content").eq("id", aliceNoteId);
    expect(data?.[0]?.content).toBe("Alicina tajna beleška");
  });
});
