import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Drizzle šema — TypeScript ogledalo stanja baze.
 *
 * Izvor istine za šemu i RLS politike su SQL migracije u `migrations/`.
 * Svaka promena ide kroz novu migraciju + ažuriranje ovog fajla (vidi CLAUDE.md).
 */

/** Profil korisnika — kreira ga trigger `on_auth_user_created` pri signup-u. */
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Demo tabela sa korisničkim podacima — pokazuje RLS obrazac "vidim samo svoje". */
export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export * from "./posts";
// @ludus:inject:db:schema-exports
