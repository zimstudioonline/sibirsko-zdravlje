import { z } from "zod";

/**
 * Env validacija za `apps/app`.
 *
 * Invarijanta: sve env varijable idu kroz Zod šemu. App puca na startu
 * (instrumentation.ts poziva assertEnv) ako fali obavezan ključ.
 *
 * Parse je lenj (poziva se u runtime-u, ne u module scope-u) da `next build`
 * ne bi zahtevao prave ključeve.
 */

const serverSchema = z.object({
  /** Supabase pooler connection string, transaction mode (port 6543). */
  DATABASE_URL: z.string().min(1),
  /** Service-role ključ — SAMO server. Zaobilazi RLS, čuvaj ga kao tajnu. */
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  // @ludus:inject:env:server-schema
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  // @ludus:inject:env:client-schema
});

/**
 * Next.js inline-uje NEXT_PUBLIC_* varijable samo kad su navedene literalno,
 * pa svaka client varijabla mora ručno da stoji u ovoj mapi.
 */
const clientRuntime: Record<keyof z.infer<typeof clientSchema>, string | undefined> = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  // @ludus:inject:env:client-runtime
};

function formatIssues(error: z.ZodError): string {
  return error.issues.map((issue) => issue.path.join(".")).join(", ");
}

let cachedClient: z.infer<typeof clientSchema> | null = null;
let cachedServer: z.infer<typeof serverSchema> | null = null;

export function clientEnv(): z.infer<typeof clientSchema> {
  if (!cachedClient) {
    const parsed = clientSchema.safeParse(clientRuntime);
    if (!parsed.success) {
      throw new Error(`Nevalidne client env varijable: ${formatIssues(parsed.error)}`);
    }
    cachedClient = parsed.data;
  }
  return cachedClient;
}

export function serverEnv(): z.infer<typeof serverSchema> {
  if (!cachedServer) {
    const parsed = serverSchema.safeParse(process.env);
    if (!parsed.success) {
      throw new Error(`Nevalidne server env varijable: ${formatIssues(parsed.error)}`);
    }
    cachedServer = parsed.data;
  }
  return cachedServer;
}

/** Puca odmah ako fali obavezan ključ — poziva se na startu servera. */
export function assertEnv(): void {
  clientEnv();
  serverEnv();
}
