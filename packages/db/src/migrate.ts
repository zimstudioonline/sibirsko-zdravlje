import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

/**
 * Primeni sve neprimenjene migracije iz `migrations/` (Drizzle migrator).
 * Pokretanje: `bun run db:migrate` (iz korena) ili `bun run src/migrate.ts` odavde.
 */

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL nije postavljen. Kopiraj .env.example u .env i popuni ključeve.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });
const migrationsFolder = fileURLToPath(new URL("../migrations", import.meta.url));

try {
  await migrate(drizzle(sql), { migrationsFolder });
  console.log("Migracije primenjene.");
} finally {
  await sql.end();
}
