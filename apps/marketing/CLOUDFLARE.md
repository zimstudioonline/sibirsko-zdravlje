# Deploy na Cloudflare Workers (OpenNext)

Marketing sajt se deployuje na Cloudflare Workers preko
[OpenNext](https://opennext.js.org/cloudflare) adaptera, ne preko Vercela.
Deploy ide kroz GitHub Actions (`.github/workflows/deploy-marketing.yml`),
**ne ručno sa Windows-a** — objašnjenje ispod.

## Zašto CI, a ne `bun run cf:deploy` sa svog računara

OpenNext build koristi Next.js `standalone` output, koji pravi simboličke
linkove ka `node_modules`. Windows to dozvoljava samo uz uključen
**Developer Mode** (Settings → Privacy & Security → For developers) — bez
njega build puca sa `EPERM: operation not permitted, symlink`. Da ne bismo
menjali bezbednosno podešavanje sistema, build i deploy idu na Linux GitHub
Actions runneru, gde ovog ograničenja nema.

Ako ipak želiš lokalni build/preview (npr. na Mac/Linux, ili na Windows-u sa
uključenim Developer Mode-om):

```bash
cd apps/marketing
bun run cf:preview   # build + lokalni preview u Workers runtime-u
bun run cf:deploy    # build + wrangler deploy (traži wrangler login)
```

## Jednokratno podešavanje (pre prvog CI deploy-a)

1. **Cloudflare API token** — [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) →
   Create Token → predložak **"Edit Cloudflare Workers"** je dovoljan.
2. U GitHub repo-u: **Settings → Secrets and variables → Actions**:
   - **Secrets** (tajne, nikad ne idu u kod):
     - `CLOUDFLARE_API_TOKEN` — token iz koraka 1.
     - `CLOUDFLARE_ACCOUNT_ID` — sa [dash.cloudflare.com](https://dash.cloudflare.com) desni sidebar na bilo kojoj stranici naloga.
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — ako blog modul koristi Supabase (opciono).
   - **Variables** (nisu tajne, samo config): sve ostale `NEXT_PUBLIC_*` iz
     `.env.example` koje želiš da budu drugačije od default vrednosti u
     `packages/config/src/marketing-env.ts` — npr.
     `NEXT_PUBLIC_MARKETING_URL` (pravi domen), `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
     `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT`,
     `NEXT_PUBLIC_SUPABASE_URL`.
3. Prvi push na `main` (ili ručno pokretanje workflow-a: **Actions → Deploy
   marketing (Cloudflare) → Run workflow**) kreira Worker na Cloudflare
   nalogu iz `wrangler.jsonc` (`name: "sibirsko-zdravlje-marketing"`).
4. Nakon prvog deploy-a, Worker dobija `*.workers.dev` adresu u Cloudflare
   dashboardu. Custom domen se vezuje u **Workers & Pages → tvoj Worker →
   Settings → Domains & Routes**.

## Ograničenja ovog setapa

- **Bez baze u ovom modulu** — katalog proizvoda i upit forma rade sa
  statičkim podacima i Google Apps Scriptom (vidi `google-apps-script/SETUP.md`),
  bez potrebe za Supabase promenljivama. `NEXT_PUBLIC_SUPABASE_*` su potrebne
  samo ako je uključen blog modul.
- **Blog ISR** (`revalidate = 60`) radi bez deljenog cache-a između Worker
  instanci (nema R2 bucket za `incrementalCache`) — svaki isolate revalidira
  nezavisno. Za sajt sa retkim objavama ovo je zanemarljivo; ako zatreba
  deljen cache, dodaj R2 bucket i `incrementalCache` override u
  `open-next.config.ts` (vidi OpenNext dokumentaciju za caching).
- `next/image` se koristi sa `unoptimized` (vidi `product-card.tsx`) — slike
  proizvoda se serviraju direktno sa `sibirskozdravlje.com`, bez Cloudflare
  Images optimizacije. Dovoljno za sada; može se kasnije dodati `images`
  binding u `wrangler.jsonc` ako zatreba optimizacija.
