# Sibirsko Zdravlje

SaaS projekat generisan iz [LudusVibe](https://ludusvibe.com) templejta:
Next.js + Supabase (Auth, Postgres, RLS) + Drizzle + Turborepo + Bun + Biome.

> Prvo pročitaj **CLAUDE.md** — tamo su invarijante i recepti za rad sa Claude Code.

## Brzi start (lokalno, preporučeno)

Treba ti [Docker](https://docs.docker.com/get-docker/) — sve ostalo je jedna komanda:

```bash
bun install
bun run local:setup        # podiže Supabase u Dockeru, piše .env, migrira, seed-uje
bun run dev                # app: localhost:3000, marketing: localhost:3001
```

Prijavi se odmah sa seed nalozima:

| Nalog | Lozinka | Uloga |
|---|---|---|
| `admin@local.test` | `lozinka123!` | admin |
| `korisnik@local.test` | `lozinka123!` | običan korisnik (ima demo beleške) |

Supabase Studio (pregled baze): adresu ispisuje `local:setup` ·
`bun test` pokreće i integracione testove nad lokalnom bazom ·
`bun run local:stop` gasi stack (podaci ostaju).

> Portovi lokalnog stacka su izvedeni iz imena projekta (vidi
> `supabase/config.toml` i `ludus.config.json`), pa više generisanih
> projekata radi uporedo. Ako ipak dobiješ **"port is already allocated"**,
> zaustavi drugi stack (`supabase stop --project-id <ime>`) ili promeni
> portove u `supabase/config.toml` pa ponovo `bun run local:setup`.

## Produkcija (pravi Supabase projekat)

```bash
# 1. Napravi Supabase projekat na supabase.com, pa:
cp .env.example .env       # popuni ključeve (Settings → API i Database)

# 2. Migracije nad produkcionom bazom
bun run db:migrate
```

## Google prijava (opciono)

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services →
   Credentials → Create OAuth client ID (Web application).
2. **Lokalno**: redirect URI je `http://127.0.0.1:<api-port>/auth/v1/callback`
   (port iz `supabase/config.toml`), pa odkomentariši `[auth.external.google]`
   blok u `supabase/config.toml` i pokreni `bun run local:setup` ponovo.
3. **Produkcija**: Supabase Dashboard → Authentication → Providers → Google
   (redirect URI ti piše tamo).
4. Dugme "Nastavi sa Google-om" već postoji na prijavi i registraciji.

## Šta je uključeno

- **Auth end-to-end:** registracija (email potvrda), prijava, odjava, zaštićene
  rute kroz middleware, cookie sesija (`@supabase/ssr`).
- **RLS od prvog dana:** `profiles` i demo `notes` tabela sa politikama
  "vidim samo svoje" — politike su u SQL migracijama.
- **Dva app-a, dva deploya:** `apps/app` (proizvod) i `apps/marketing` (javni
  sajt) — svaki ide na svoj Vercel projekat (vidi `docs/deploy/vercel.md`
  u generatoru ili uputstva ispod).
- **Env disciplina:** Zod šema puca na startu ako fali ključ.

## Deploy na Vercel (dva projekta)

1. Push repo na GitHub.
2. Vercel → New Project → izaberi repo → **Root Directory: `apps/app`** →
   dodaj env varijable iz `.env` → Deploy.
3. Ponovi sa **Root Directory: `apps/marketing`** (dovoljne su
   `NEXT_PUBLIC_MARKETING_URL` i `NEXT_PUBLIC_APP_URL`).
4. `vercel.json` u oba app-a već koristi `turbo-ignore`, pa se ne rebuilduje
   app koji nije menjan.

---

# Podešavanje modula

## Modul: Google Analytics 4 — podešavanje

1. Napravi GA4 property na [analytics.google.com](https://analytics.google.com)
   i uzmi Measurement ID (Admin → Data Streams → Web).
2. Upiši ga u `.env` kao `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...` (i u env
   varijable marketing projekta na Vercelu).
3. Skripta se učitava tek posle klika "Prihvatam" na consent baneru.

## Modul: Meta Pixel — podešavanje

1. Meta Events Manager → Data sources → tvoj Pixel → ID ide u
   `NEXT_PUBLIC_META_PIXEL_ID`.
2. Skripta se učitava tek posle klika "Prihvatam" na consent baneru.
3. Proveri instalaciju kroz Meta Pixel Helper ekstenziju (uz dat consent).

## Modul: Blog — podešavanje

Blog radi odmah uz postojeći Supabase — migracija pravi `posts` tabelu sa
demo objavom.

1. **Pisanje:** prijavi se admin nalogom → korisnički meni → **Admin portal**
   → **Blog** → **Nova objava**. Štikliraj **Objavljeno** da tekst izađe na
   sajt (nacrti ostaju privatni).
2. **Marketing sajt:** da bi `/blog` prikazao objave, marketing projektu
   trebaju `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (iste vrednosti kao za app). Lokalno već stoje u `.env`; na Vercelu ih
   dodaj i u marketing projekat. Bez njih je blog prazan.
3. Objave su vidljive najkasnije minut posle čuvanja (ISR, `revalidate = 60`).

## Modul: SEO / AEO — podešavanje

1. Postavi `NEXT_PUBLIC_MARKETING_URL` na pravi domen (bitno za canonical
   linkove i sitemap).
2. Organization schema je već u layout-u; za blog objave dodaj
   `<JsonLd data={articleJsonLd(post)} />`, za FAQ sekcije `faqJsonLd(...)`.
3. Posle deploya: Google Search Console → dodaj domen → pošalji
   `https://<domen>/sitemap.xml`.

<!-- @ludus:inject:readme:modules -->

## Nadogradnja templejta

Ovaj projekat je snapshot — nema automatskog sync-a sa templejtom. Kad izađe
nova verzija baze, promene stižu kroz CHANGELOG i upgrade vodič, a primenjuješ
ih kroz Claude Code.
