import { z } from "zod";

/**
 * Env validacija za `apps/marketing`.
 *
 * Marketing sajt namerno NE zavisi od Supabase ključeva — deploy-uje se kao
 * poseban Vercel projekat bez pristupa bazi. Sve varijable ovde su opcione,
 * a komponente koje ih koriste moraju imati graceful fallback (render null).
 */

const marketingSchema = z.object({
  NEXT_PUBLIC_MARKETING_URL: z.string().url().default("http://localhost:3001"),
  /** URL SaaS aplikacije (apps/app) — koristi se za CTA linkove ka prijavi. */
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  /** Broj za Viber dugme, format bez "+" i vodećih nula, npr. "381616598108". */
  NEXT_PUBLIC_VIBER_NUMBER: z.string().default("381616598108"),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().default("zdravljeisibir@gmail.com"),
  /**
   * Google Apps Script Web App URL koji prima upite sa forme (vidi
   * apps/marketing/google-apps-script/SETUP.md). Bez vrednosti forma
   * prikazuje poruku da trenutno nije dostupna — sajt i dalje radi.
   */
  NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT: z.string().url().optional(),
  // @ludus:inject:env:marketing-schema
});

/**
 * Next.js inline-uje NEXT_PUBLIC_* varijable samo kad su navedene literalno,
 * pa svaka client varijabla mora ručno da stoji u ovoj mapi.
 */
const marketingRuntime: Record<string, string | undefined> = {
  NEXT_PUBLIC_MARKETING_URL: process.env.NEXT_PUBLIC_MARKETING_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_VIBER_NUMBER: process.env.NEXT_PUBLIC_VIBER_NUMBER,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT: process.env.NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT,
  // @ludus:inject:env:marketing-runtime
};

let cached: z.infer<typeof marketingSchema> | null = null;

export function marketingEnv(): z.infer<typeof marketingSchema> {
  if (!cached) {
    const parsed = marketingSchema.safeParse(marketingRuntime);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
      throw new Error(`Nevalidne marketing env varijable: ${issues}`);
    }
    cached = parsed.data;
  }
  return cached;
}
