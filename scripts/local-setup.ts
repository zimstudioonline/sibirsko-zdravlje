import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Lokalni razvoj jednom komandom: `bun run local:setup`
 *
 * 1. Podigne Supabase stack u Dockeru (Postgres + Auth + Studio).
 * 2. Upiše lokalne ključeve u .env (ostatak dolazi iz .env.example).
 * 3. Primeni migracije i seed (admin + običan korisnik + demo podaci).
 *
 * Posle ovoga: `bun run dev` i aplikacija radi na http://localhost:3000.
 * Gašenje stacka: `bun run local:stop` (podaci ostaju sačuvani u Dockeru).
 */

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Sistemski supabase CLI ako postoji (brže), inače bunx (skida npm paket).
const SUPABASE =
  Bun.spawnSync(["which", "supabase"], { stdout: "ignore", stderr: "ignore" }).exitCode === 0
    ? ["supabase"]
    : ["bunx", "supabase"];

function run(cmd: string[], inherit = true): { ok: boolean; stdout: string } {
  const result = Bun.spawnSync(cmd, {
    cwd: ROOT,
    stdout: inherit ? "inherit" : "pipe",
    stderr: "inherit",
  });
  return { ok: result.exitCode === 0, stdout: inherit ? "" : result.stdout.toString() };
}

// 1) Docker mora da radi
if (Bun.spawnSync(["docker", "info"], { stdout: "ignore", stderr: "ignore" }).exitCode !== 0) {
  console.error(
    "Docker ne radi. Pokreni Docker Desktop (ili colima/orbstack) pa probaj ponovo.\n" +
      "Instalacija: https://docs.docker.com/get-docker/",
  );
  process.exit(1);
}

// 2) Supabase stack (prvi put povlači Docker slike — sačekaj nekoliko minuta)
console.log("Podižem lokalni Supabase stack (Docker)...");
if (!run([...SUPABASE, "start"]).ok) {
  console.error(`
\`supabase start\` nije uspeo — pogledaj poruku iznad.

Najčešći uzrok: "port is already allocated" — na ovom računaru već radi
lokalni stack nekog drugog projekta na istim portovima. Opcije:

  1) Zaustavi drugi projekat (podaci mu ostaju sačuvani):
       supabase stop --project-id <ime-iz-poruke-iznad>
  2) ili promeni portove u supabase/config.toml (sekcije [api], [db],
     [studio], [inbucket]), pa ponovo: bun run local:setup

Portovi ovog projekta se izvode iz njegovog imena baš da bi više projekata
radilo uporedo — sudar znači da drugi stack koristi podrazumevane portove.
`);
  process.exit(1);
}

// 3) Ključevi lokalnog stacka → .env
const status = run([...SUPABASE, "status", "-o", "env"], false);
if (!status.ok) {
  console.error("`supabase status` nije uspeo.");
  process.exit(1);
}
const values: Record<string, string> = {};
for (const line of status.stdout.split("\n")) {
  const match = /^([A-Z_]+)="?([^"]*)"?$/.exec(line.trim());
  if (match?.[1] && match[2] !== undefined) {
    values[match[1]] = match[2] ?? "";
  }
}

const required = ["API_URL", "ANON_KEY", "SERVICE_ROLE_KEY", "DB_URL"] as const;
for (const key of required) {
  if (!values[key]) {
    console.error(`U izlazu \`supabase status\` nedostaje ${key} — proveri verziju CLI-ja.`);
    process.exit(1);
  }
}

const overrides: Record<string, string> = {
  NEXT_PUBLIC_SUPABASE_URL: values.API_URL as string,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: values.ANON_KEY as string,
  SUPABASE_SERVICE_ROLE_KEY: values.SERVICE_ROLE_KEY as string,
  DATABASE_URL: values.DB_URL as string,
};

const envPath = `${ROOT}/.env`;
let env = readFileSync(existsSync(envPath) ? envPath : `${ROOT}/.env.example`, "utf8");
for (const [key, value] of Object.entries(overrides)) {
  const line = `${key}=${value}`;
  env = new RegExp(`^${key}=`, "m").test(env)
    ? env.replace(new RegExp(`^${key}=.*$`, "m"), line)
    : `${env.trimEnd()}\n${line}\n`;
}
writeFileSync(envPath, env);
console.log(".env ažuriran lokalnim ključevima.");

// 4) Migracije + seed (novi bun procesi čitaju svež .env)
console.log("Primenjujem migracije...");
if (!run(["bun", "packages/db/src/migrate.ts"]).ok) {
  process.exit(1);
}
console.log("Punim bazu (seed)...");
if (!run(["bun", "packages/db/src/seed.ts"]).ok) {
  process.exit(1);
}

// 5) Jednokratno formatiranje (asembler sklapa fajlove iz modula, pa raspored
// importa ume da odstupa od biome pravila) — posle ovoga je `bun run lint` zelen.
console.log("Sređujem formatiranje (biome)...");
run(["bunx", "biome", "check", "--write", "."], false);

console.log(`
Spremno! Sledeći koraci:

  bun run dev          → app:       http://localhost:3000
                         marketing: http://localhost:3001
  Supabase Studio      → ${values.STUDIO_URL ?? "http://127.0.0.1:54323"}
  Email sanduče (lok.) → ${values.INBUCKET_URL ?? "http://127.0.0.1:54324"} (tu stižu confirm/reset mejlovi)

Nalozi (seed):
  admin@local.test     / lozinka123!   (admin)
  korisnik@local.test  / lozinka123!   (običan korisnik, ima demo beleške)

  bun test             → puni testovi (uključuje RLS i webhook testove na lokalnoj bazi)
  bun run local:stop   → gasi stack (podaci ostaju)
`);
