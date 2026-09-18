import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Učita .env iz KORENA monorepa u process.env — jedan .env za ceo projekat.
 *
 * Next.js sam čita .env samo iz direktorijuma app-a (apps/app), a `bun run`
 * ne prosleđuje .env u podprocese (turbo → next). Zato oba next.config.ts
 * importuju ovaj fajl. Postojeće vrednosti iz okruženja (npr. na Vercelu)
 * imaju prednost i ne prepisuju se.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const envPath = join(root, ".env");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    if (!(key in process.env)) {
      process.env[key] = trimmed.slice(eq + 1).trim();
    }
  }
}
