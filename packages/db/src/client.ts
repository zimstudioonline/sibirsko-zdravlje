import { serverEnv } from "@repo/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Direktna Drizzle konekcija na Supabase Postgres — zaobilazi RLS!
 *
 * Koristi se ISKLJUČIVO za poverene serverske operacije (webhookovi, admin,
 * migracije). Korisnički podaci se čitaju/pišu kroz Supabase klijent sa JWT-om
 * korisnika, da RLS važi po korisniku.
 *
 * `prepare: false` + `max: 1` su obavezni za pooler u transaction modu.
 */

let cached: ReturnType<typeof createDb> | null = null;

function createDb() {
  const sql = postgres(serverEnv().DATABASE_URL, { prepare: false, max: 1 });
  return drizzle(sql, { schema });
}

export function adminDb() {
  if (!cached) {
    cached = createDb();
  }
  return cached;
}
