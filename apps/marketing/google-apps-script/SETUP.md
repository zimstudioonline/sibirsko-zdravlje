# Forme sa sajta → Google Sheets (bez sopstvenog servera)

Sajt se deployuje na Cloudflare bez baze i bez backend servera, pa forme —
kontakt forma (`/kontakt`) i prijava za besplatne savete
(`/besplatni-saveti`) — šalju podatke direktno na ISTI Google Apps Script
Web App, koji upisuje red u odgovarajući Google Sheet ("Kontakt" ili
"Saveti") i šalje ti email obaveštenje. `handleUpit` / sheet "Upiti" ostaje
radi starih zahteva (katalog je uklonjen sa sajta). Razlikuju se po skrivenom polju
`tip` koje svaka forma šalje. Ovo se podešava jednom, van Next.js koda.

## Podešavanje (5-10 minuta)

1. Napravi novi Google Sheet (npr. "Sibirsko Zdravlje — Upiti") na
   [sheets.google.com](https://sheets.google.com).
2. U meniju: **Extensions → Apps Script**.
3. Obriši placeholder kod i nalepi sadržaj fajla [`Code.gs`](./Code.gs) iz
   ovog foldera.
4. U nalepljenom kodu izmeni `NOTIFY_EMAIL` ako želiš obaveštenja na drugu
   adresu (podrazumevano `zdravljeisibir@gmail.com`).
5. **Deploy → New deployment**:
   - Type: **Web app**
   - Execute as: **Me** (tvoj Google nalog)
   - Who has access: **Anyone**
   - Klikni **Deploy**, autorizuj skriptu kad zatraži pristup (to je tvoj
     sopstveni sheet, dozvola je bezbedna).
6. Kopiraj **Web app URL** koji dobiješ (izgleda kao
   `https://script.google.com/macros/s/AKfycb.../exec`).
7. Upiši ga u `.env` (i lokalno i na Cloudflareu, kao environment variable za
   `apps/marketing`):

   ```
   NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
   ```

8. Redeploy-uj marketing sajt. Obe forme sad rade — testiraj slanjem upita i
   poruke sa kontakt forme, proveri da su se pojavila dva sheet-a ("Upiti" i
   "Kontakt") i da su stigla dva emaila.

## Kako da izmeniš formu kasnije

- Nova polja u formi za savete: dodaj `<input name="novoPolje">` u
  `src/components/leads/saveti-form.tsx`, pa dodaj isto ime u `Code.gs`
  (funkcija `handleSaveti`).
- Nova polja u kontakt formi: isto, u
  `src/components/contact/kontakt-form.tsx` i `Code.gs` (funkcija
  `handleKontakt`).
- Ako menjaš Apps Script kod nakon prvog deploy-a, koristi
  **Deploy → Manage deployments → uredi postojeći deployment** i klikni
  **Deploy** ponovo — URL ostaje isti, ne treba menjati env varijablu.

## Poznato ograničenje

Apps Script Web App ne dozvoljava čitanje odgovora sa custom CORS headera iz
browsera, pa forma šalje zahtev sa `mode: "no-cors"` — to znači da JS kod ne
može da pročita da li je upis stvarno uspeo, samo da li je mrežni zahtev
prošao bez greške. Za ovu upotrebu (nisko-rizičan lead-gen formular) to je
prihvatljivo; ako ti zatreba pouzdana potvrda uspeha, razmisli o pravom
backend endpointu (npr. Cloudflare Worker) umesto Apps Scripta.
