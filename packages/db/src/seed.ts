import { createClient } from "@supabase/supabase-js";

/**
 * Seed lokalne baze: admin + običan korisnik + demo beleške.
 * Idempotentan — slobodno ga pokrećeš više puta (`bun run db:seed`).
 *
 * Uloga admina živi u app_metadata (menja je samo service-role/admin API,
 * korisnik NE može sam sebi da je dodeli — za razliku od user_metadata).
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Fale NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — pokreni `bun run local:setup`.");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const SEED_USERS = [
  {
    email: "admin@local.test",
    password: "lozinka123!",
    fullName: "Ana Admin",
    role: "admin",
    notes: [],
  },
  {
    email: "korisnik@local.test",
    password: "lozinka123!",
    fullName: "Marko Korisnik",
    role: "user",
    notes: [
      "Dobrodošao! Ovo je demo beleška iz seed-a.",
      "RLS radi: admin nalog NE vidi ove beleške — svako vidi samo svoje.",
    ],
  },
] as const;

async function findUserByEmail(email: string): Promise<string | null> {
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) {
    throw error;
  }
  return data.users.find((user) => user.email === email)?.id ?? null;
}

for (const seedUser of SEED_USERS) {
  let userId = await findUserByEmail(seedUser.email);

  if (userId) {
    console.log(`= ${seedUser.email} već postoji`);
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email: seedUser.email,
      password: seedUser.password,
      email_confirm: true,
      app_metadata: { role: seedUser.role },
      user_metadata: { full_name: seedUser.fullName },
    });
    if (error || !data.user) {
      throw error ?? new Error(`Kreiranje ${seedUser.email} nije uspelo.`);
    }
    userId = data.user.id;
    console.log(`+ ${seedUser.email} (${seedUser.role})`);
  }

  // Trigger je upisao profil sa emailom; dopuni ime (service-role, RLS ne važi).
  await admin.from("profiles").update({ full_name: seedUser.fullName }).eq("id", userId);

  if (seedUser.notes.length > 0) {
    const { count } = await admin
      .from("notes")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);
    if (!count) {
      await admin
        .from("notes")
        .insert(seedUser.notes.map((content) => ({ user_id: userId, content })));
      console.log(`  + ${seedUser.notes.length} demo beleške`);
    }
  }
}

console.log("Seed gotov. Prijava: admin@local.test ili korisnik@local.test / lozinka123!");
