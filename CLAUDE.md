# Sibirsko Zdravlje — uputstvo za rad sa Claude Code

Ovaj projekat je generisan iz LudusVibe SaaS templejta. Auth, baza, RLS, env
validacija i monorepo struktura su već postavljeni i **provereni** — tvoj posao
je da na ovim osnovama gradiš svoj proizvod, ne da ih menjaš.

## Struktura

```
apps/
  app/         # SaaS proizvod (iza auth-a), port 3000
  marketing/   # javni sajt SibirskaPriroda.com (edukativni portal + funnel, SEO), port 3001 — deploy na Cloudflare Workers (vidi apps/marketing/CLOUDFLARE.md), NE Vercel
packages/
  ui/          # design system (Space Grotesk, primarna #0EA5E9, podloga #F7F6F1)
  db/          # Drizzle šema + migracije (Supabase Postgres)
  auth/        # Supabase Auth klijenti (server, browser, admin, middleware)
  config/      # Zod env šeme + deljeni tsconfig
  payments/    # apstraktni payment interfejs (provajdere dodaju moduli)
```

## Komande

```bash
bun install            # instalacija
bun run local:setup    # lokalni Supabase (Docker) + .env + migracije + seed
bun run local:stop     # gasi lokalni stack (podaci ostaju)
bun run dev            # oba app-a (turbo)
bun run typecheck      # tsc za ceo monorepo
bun run build          # build za ceo monorepo
bun test               # testovi (uz lokalni stack i RLS/webhook integracioni)
bun run lint           # biome check
bun run db:migrate     # primeni migracije na bazu (DATABASE_URL iz .env)
bun run db:seed        # seed nalozi i demo podaci (idempotentan)
```

## Setup (prvi put)

**Lokalno (default):** `bun install` → `bun run local:setup` → `bun run dev`.
Skripta podiže Supabase u Dockeru, upisuje lokalne ključeve u `.env`, primenjuje
migracije i seed-uje naloge: `admin@local.test` / `korisnik@local.test`
(lozinka `lozinka123!`). Ne popunjavaj `.env` ručno za lokalni rad.

**Produkcija:** napravi Supabase projekat, popuni `.env` (Dashboard → Settings
→ API), `DATABASE_URL` mora biti **pooler** string u transaction modu
(port 6543), pa `bun run db:migrate`.

## UI pravila (shadcn/ui + Tailwind)

- UI se gradi ISKLJUČIVO shadcn/ui komponentama iz `@repo/ui` + Tailwind
  klasama. Bez novih UI biblioteka i bez ručnog CSS-a van `globals.css`.
- Komponente žive u `packages/ui/src/components/ui/` (shadcn konvencija).
  Nova shadcn komponenta se dodaje TU (kopiraj iz shadcn docs), pa se
  re-eksportuje u `packages/ui/src/index.ts` ako je često korišćena.
- Ikonice: `lucide-react` (već instaliran). Bez drugih icon setova.
- Boje/razmaci idu preko theme tokena (`bg-primary`, `text-muted-foreground`,
  `border`, `bg-sidebar`...). Tokeni su u `globals.css` oba app-a — brend se
  menja TAMO, ne po komponentama. Aliasi `text-ink`/`bg-paper` postoje zbog
  starijeg koda.
- Dashboard okvir (sidebar + header) je u `apps/app/src/app/dashboard/layout.tsx`
  — nove dashboard stranice renderuju SAMO sadržaj, bez sopstvenog okvira.
  Linkovi u sidebar-u: `components/app-sidebar.tsx` (`navItems`), stavke u
  korisničkom meniju: `components/nav-user.tsx`.

## Auth tokovi (svi su implementirani — ne izmišljaj nove)

- Prijava/registracija email+lozinka: `(auth)/actions.ts` (`login`, `signup`).
- Google OAuth: `signInWithGoogle` → `/auth/callback` (PKCE exchange).
  Provider se uključuje u Supabase podešavanjima (lokalno: `supabase/config.toml`,
  produkcija: Dashboard → Authentication → Providers).
- Zaboravljena lozinka: `/forgot-password` → email link → `/auth/callback?next=/reset-password`
  → `/reset-password` (recovery sesija) → `changePassword`.
- Promena lozinke ulogovanog korisnika: `/dashboard/settings`.
- `/auth/confirm` je fallback za prilagođene email šablone (token_hash).
- Novi zaštićeni URL-ovi rade automatski (middleware štiti sve osim
  PUBLIC_PATHS) — u PUBLIC_PATHS dodaješ samo stvarno javne rute.

## Pravne stranice

`/privatnost` i `/uslovi` na marketing sajtu su ŠABLONI za firme iz Srbije
(ZZPL, Zakon o zaštiti potrošača) — sadrže polja u [uglastim zagradama]
(naziv firme, PIB, matični broj...). Pomozi korisniku da ih popuni i prilagodi
svom proizvodu, ali ga UVEK podseti da tekst pregleda advokat pre objave —
ovo nije pravni savet. Žuti okvir upozorenja na tim stranicama se briše tek
kad je sadržaj finalan.

## Uloge (admin)

Uloga živi u `app_metadata.role` (`"admin"` | `"user"`) — postavlja je samo
admin API / seed, korisnik NE može sam sebi da je promeni (za razliku od
`user_metadata`). Provera na serveru: `user.app_metadata.role === "admin"`.
Nikad ne čitaj ulogu iz `user_metadata` niti iz klijentskog inputa.

## Admin portal

`/admin` je standardni deo templejta: poseban dashboard sa sopstvenim
sidebar-om. Ulaz je stavka "Admin portal" u korisničkom meniju (vidljiva samo
adminu). Podrazumevane stranice: `/admin` (kontrolna tabla sa karticama) i
`/admin/korisnici` (lista korisnika + dodela uloga). Moduli dodaju svoje
linkove u `components/admin-sidebar.tsx` (`adminNavItems`), a kartice na
kontrolnu tablu u `app/admin/page.tsx`.

- **Guard po ulozi je na SERVERU** — u layout-u, SVAKOJ stranici i SVAKOJ
  server akciji (`requireAdmin()` iz `src/lib/admin.ts`). Server akcija je
  javno pozivljiv endpoint; provera samo u layout-u nije dovoljna.
- Service-role pozivi (`createSupabaseAdminClient`, `auth.admin.*`) smeju SAMO
  u server kod admin portala, iza `requireAdmin()` — nikad u client komponente.
- **Sopstvena uloga se ne menja** (akcija to odbija) — namerno, da poslednji
  admin ne zaključa sam sebe. Ne "popravljaj" to.

## Invarijante (NIKAD ih ne krši)

- **RLS:** svaka tabela sa korisničkim podacima ima uključen RLS i eksplicitne
  politike. Nikad ne isključuj RLS da bi nešto "proradilo". Ako upit ne vraća
  podatke, problem je u politici ili JWT-u — popravi uzrok.
- **Pristup podacima:** korisnički podaci se čitaju i pišu kroz Supabase klijent
  koji nosi JWT korisnika (`createSupabaseServerClient` / browser klijent), tako
  da RLS važi po korisniku. Drizzle (`adminDb`) i service-role klijent su samo za
  poverene serverske operacije: webhookovi, admin poslovi, migracije.
- **Webhook potpis:** svaki webhook handler PRVO verifikuje potpis, pa tek onda
  obrađuje telo. Handler bez verifikacije potpisa je bezbednosna rupa.
- **Tajne:** service-role i secret ključevi žive samo na serveru. U browser smeju
  isključivo `NEXT_PUBLIC_` varijable. Nikad ne uvozi server-only module u client
  komponente.
- **Env:** svaka nova env varijabla ide kroz Zod šemu u `packages/config/src/`
  (`env.ts` za app, `marketing-env.ts` za marketing). App puca na startu ako fali
  obavezan ključ — to je namerno.
- **Migracije:** svaka promena šeme baze je nova SQL migracija u
  `packages/db/migrations` + entry u `meta/_journal.json` + ažuriranje
  `src/schema.ts`. Bez ručnih izmena baze kroz Supabase Studio.
- **Izvor istine za plaćanje:** status pretplate dolazi iz webhook-a, nikad iz
  redirect URL-a posle checkout-a. Redirect je samo UX.
- **Granice modula:** feature ne importuje direktno iz drugog feature-a. Deljena
  logika ide u `packages/`.
- **Determinizam:** build ne sme da zavisi od mreže ili LLM poziva.
- **Consent:** analitika i pixel skripte se učitavaju tek posle korisničkog
  pristanka (EU pravila). Consent gate se ne zaobilazi.
- **Konekcija na bazu (Vercel):** na serverless funkcijama uvek Supabase pooler
  connection string (transaction mode, port 6543), nikad direktna konekcija —
  direktne konekcije se brzo iscrpe.
- **Pin-ovane verzije:** sve zavisnosti u `package.json` fajlovima su TAČNE
  verzije (bez `^`/`~`) — namerno, da svaka instalacija reprodukuje testirano
  stanje (nova minor verzija zavisnosti ume da slomi produkciju, npr.
  radix-slot 1.3.1 je uveo `createContext` koji ruši server komponente).
  Ne vraćaj range-ove. Nadogradnja = svesna promena pina + `bun run typecheck`
  + `bun test` + ručna provera obe aplikacije.
- **Redirect mete iz inputa:** svaka putanja koja stiže iz forme/URL-a mora da
  prođe proveru `path.startsWith("/") && !path.startsWith("//")` pre
  `redirect()` — `//host` je protokol-relativni URL, tj. open-redirect.

## Bezbednost — šta je već podešeno i šta ostaje tebi

- **Security headeri** (X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy) su u `next.config.ts` oba app-a. Strogi CSP nije
  uključen — zahteva nonce setup i allowlist za analitiku; uvodi se svesno,
  tek kad znaš koje eksterne skripte sajt učitava.
- **Greške plaćanja i AI chata degradiraju graciozno** (poruka korisniku
  umesto sirovog 500) — zadrži taj obrazac u novim akcijama: provajderski
  poziv u `try/catch`, `redirect()` UVEK van `try` bloka (interno radi kroz
  throw, `catch` bi ga progutao).
- **Pre produkcije razmisli o rate limitu** na skupim rutama (`/api/chat` je
  iza auth-a, ali ulogovan korisnik i dalje može da troši tvoj AI budžet u
  petlji). Najjednostavnije: brojač poziva po korisniku u bazi ili Upstash
  Redis limiter.

## Kako se dodaje nova tabela (recept)

1. Novi SQL fajl u `packages/db/migrations/` (sledeći redni broj), sa
   `--> statement-breakpoint` između iskaza.
2. U istom fajlu: `enable row level security` + politike (`select`, `insert`,
   `update`, `delete` po potrebi, tipično `(select auth.uid()) = user_id`).
3. Dodaj entry u `migrations/meta/_journal.json` (idx +1, novi tag, veći `when`).
4. Ažuriraj `packages/db/src/schema.ts` da odslikava novo stanje.
5. `bun run db:migrate`, pa `bun run typecheck`.

---

# Uključeni moduli

Pravila ispod važe za module izabrane pri generisanju projekta.

## Modul: Google Analytics 4 (`analytics-google`)

Google Analytics 4 na marketing sajtu.

- Skripta se učitava tek kad `useConsent()` vrati `"granted"` — consent gate iz
  `@repo/ui/consent`. **Nikad ne učitavaj gtag pre pristanka** i ne uklanjaj
  `ConsentBanner` iz layout-a.
- Measurement ID dolazi iz `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Zod šema u
  `packages/config/src/marketing-env.ts`). Bez vrednosti komponenta renderuje
  `null` — sajt radi i bez analitike.
- Novi event: pozovi `window.gtag("event", ...)` iz client komponente, ali tek
  pošto proveriš consent.

## Modul: Meta Pixel (`analytics-meta-pixel`)

Meta (Facebook) Pixel na marketing sajtu.

- Deli isti consent gate sa Google Analytics (`@repo/ui/consent`) — pixel se
  učitava tek posle `"granted"`. Ne zaobilazi gate ni za "samo PageView".
- Pixel ID je u `NEXT_PUBLIC_META_PIXEL_ID`; bez vrednosti komponenta renderuje
  `null` — sajt radi i bez piksela.
- Konverzije: `window.fbq("track", "Lead")` i slično pozivaj iz client
  komponenti, tek posle provere consent-a.

## Modul: Katalog proizvoda (custom, nije deo generatora)

Javni katalog Siberian Wellness proizvoda na marketing sajtu (`/katalog`,
`/katalog/[kategorija]`) + upit forma (`/upit-za-proizvode`, sticky u
katalogu) + Viber dugme. Sajt se deployuje na Cloudflare **bez baze i bez
sopstvenog servera** — ovo namerno odstupa od podrazumevanog Supabase/Vercel
obrasca templejta.

- **Podaci o proizvodima su statički**, ne u bazi: `apps/marketing/src/lib/catalog.ts`
  (tipovi + kategorije) i `apps/marketing/src/lib/products-data.ts` (166
  proizvoda, generisano iz WooCommerce CSV eksporta sa sibirskozdravlje.com —
  vidi taj fajl pre nego što ga ručno menjaš, lakše je ponovo generisati iz
  ažuriranog CSV-a nego ručno održavati). Kategorije su podeljene u grupe
  "Namena" i "Brendovi BAD" plus par top-level (Sport, Kozmetika...) — vidi
  `categoryGroups`/`categories` u `catalog.ts`.
- **Upit forma ne ide na sopstveni backend** — šalje se direktno na Google
  Apps Script Web App (upisuje red u Google Sheet + email obaveštenje).
  Podešavanje: `apps/marketing/google-apps-script/SETUP.md` i `Code.gs`. Bez
  `NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT` forma prikazuje poruku da nije dostupna
  (isti graceful-fallback obrazac kao GA4/Pixel) — sajt i dalje radi.
- Forma šalje `fetch` sa `mode: "no-cors"` (Apps Script ne dozvoljava čitanje
  odgovora sa custom CORS headera) — uspeh se pretpostavlja ako fetch ne
  baci grešku. Poznato ograničenje, ne "popravljaj" dodavanjem CORS moda bez
  promene Apps Script strane.
- Deljeno stanje "izabrani proizvod" (klik na "Pošalji upit" na kartici →
  popuni sticky formu) ide kroz `InquiryProvider`/`useInquiry()`
  (`components/inquiry/inquiry-context.tsx`), ne kroz URL ni globalni store.
- Viber dugme (`components/viber-button.tsx`) je globalno u root layout-u;
  broj dolazi iz `NEXT_PUBLIC_VIBER_NUMBER`.
- `/prikljuci-se` je isto ŠABLON kao pravne stranice — sadrži `[PRILAGODI]`
  placeholdere za stvarnu ponudu za nove konsultante, sa žutim upozorenjem
  koje se briše kad se sadržaj finalizuje.
- Homepage, FAQ i "zašto mi" sekcija su prepisani za katalog/lead-gen
  koncept (uklonjen je SaaS pricing/signup sadržaj templejta — `/pricing` i
  `packages` cenovnik su namerno obrisani, ne vraćaj ih).
- **Deploy ide preko GitHub Actions na Cloudflare Workers** (OpenNext
  adapter), ne Vercel i ne ručno sa Windows-a — vidi
  `apps/marketing/CLOUDFLARE.md` za ceo obrazac i razlog (Windows nema
  dozvolu za simboličke linkove koje OpenNext build pravi bez uključenog
  Developer Mode-a). Workflow: `.github/workflows/deploy-marketing.yml`.

## Modul: Blog (`blog`)

Blog: objave žive u Supabase (`posts` tabela), uređuju se u admin portalu
(`/admin/blog`, TipTap markdown editor), a javno se čitaju na marketing sajtu
(`/blog`).

- **U bazi je uvek čist markdown** (`posts.content`). Editor je TipTap sa
  `@tiptap/markdown` — u formu ide `editor.getMarkdown()`. Renderovanje na
  marketingu ide kroz `react-markdown` + `remark-gfm`. Ne uvodi HTML u
  sadržaj i ne menjaj format skladištenja.
- **RLS:** `posts` ima SAMO javnu SELECT politiku za `published = true`.
  Upisi idu isključivo kroz service-role u admin akcijama
  (`apps/app/src/app/admin/blog/actions.ts`), iza `requireAdmin()` guarda —
  guard važi u SVAKOJ akciji i stranici. Ne dodaji INSERT/UPDATE politike.
- Nacrti (`published = false`) su vidljivi samo u admin portalu — anon klijent
  ih kroz RLS ne vidi ni po direktnom slug-u.
- Marketing čita objave anon klijentom (`apps/marketing/src/lib/blog.ts`) uz
  `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`. Marketing i
  dalje radi bez tih ključeva — blog je tada prazan (graceful fallback), to
  nije bug.
- Blog stranice su ISR (`revalidate = 60`) — nova objava je vidljiva bez
  deploy-a, najkasnije za minut. `published_at` se postavlja pri prvom
  objavljivanju i ne resetuje se.
- Slug se izvodi iz naslova (`slugify` u actions.ts, ista transliteracija kao
  u asembleru) i validira na `[a-z0-9-]` pre čitanja po slug-u.
- Sitemap: modul injektuje blog URL-ove u `apps/marketing/src/app/sitemap.ts`
  (anchor `sitemap:entries`) — radi i sa i bez `seo-aeo` modula.
- Tipografija članka je u `src/app/blog/blog.css` (klasa `blog-article`), a
  editora u `components/admin/post-editor.css` — drži ih vizuelno usklađene.

## Modul: SEO / AEO (`seo-aeo`)

SEO / AEO sloj na marketing sajtu.

- `src/lib/seo.ts` → `buildMetadata({title, description, path})` — koristi ga
  za `export const metadata` na svakoj novoj javnoj stranici (daje canonical,
  OG i Twitter tagove odjednom).
- `src/components/json-ld.tsx` — JSON-LD builderi: `organizationJsonLd` (već u
  layout-u), `articleJsonLd` (dodaj na blog objave), `faqJsonLd` (FAQ sekcije —
  najjači AEO signal, AI asistenti rado citiraju FAQ schema).
- Sitemap živi u bazi (`src/app/sitemap.ts`) i ima anchor `sitemap:entries` —
  blog modul sam injektuje svoje URL-ove tamo. Nove javne stranice dodaješ
  direktno u listu `entries`.
- AEO princip: piši stranice tako da direktno odgovaraju na pitanje u prvom
  pasusu, koristi semantičke headinge (jedno H1, logična H2 hijerarhija) i
  dodaj FAQ blok gde ima smisla.

<!-- @ludus:inject:claude:modules -->
