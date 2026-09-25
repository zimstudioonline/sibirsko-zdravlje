import { LegalPage, LegalSection } from "@/components/legal";

export const metadata = {
  title: "Politika privatnosti",
  description: "Kako Sibirska Priroda prikuplja, koristi i štiti podatke o ličnosti.",
};

/**
 * Šablon politike privatnosti usklađen sa Zakonom o zaštiti podataka o
 * ličnosti Republike Srbije ("Sl. glasnik RS", br. 87/2018 — ZZPL).
 * Popuni [placeholder] polja i prilagodi listu podataka svom proizvodu.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Politika privatnosti" updated="[DATUM]">
      <LegalSection title="1. Rukovalac podacima">
        <p>
          Rukovalac podacima o ličnosti je <strong>[PUNO POSLOVNO IME]</strong>, sa sedištem na
          adresi [ADRESA], matični broj [MATIČNI BROJ], PIB [PIB] (u daljem tekstu: "
          {"Sibirska Priroda"}", "mi"). Za sva pitanja u vezi sa obradom podataka možeš nam se
          obratiti na <strong>[EMAIL ZA PRIVATNOST]</strong>.
        </p>
        <p>
          Podatke obrađujemo u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije
          ("Sl. glasnik RS", br. 87/2018 — u daljem tekstu: ZZPL).
        </p>
      </LegalSection>

      <LegalSection title="2. Koje podatke prikupljamo">
        <p>Prilikom korišćenja usluge prikupljamo sledeće podatke:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Podaci o nalogu:</strong> email adresa, ime (ako ga uneseš) i lozinka u
            heširanom obliku; ako se prijavljuješ preko Google naloga — ime i email koje Google
            podeli sa nama.
          </li>
          <li>
            <strong>Sadržaj koji uneseš:</strong> podaci koje kreiraš u aplikaciji tokom korišćenja
            usluge. [PRILAGODI: nabroj tipove sadržaja u svom proizvodu]
          </li>
          <li>
            <strong>Podaci o plaćanju:</strong> plaćanja obrađuje [PROVAJDER PLAĆANJA — npr. Stripe
            / Lemon Squeezy / banka]; mi ne čuvamo broj tvoje platne kartice, već samo status
            pretplate i istoriju transakcija.
          </li>
          <li>
            <strong>Tehnički podaci:</strong> IP adresa, tip uređaja i pregledača, logovi pristupa —
            u meri neophodnoj za bezbednost i rad usluge.
          </li>
          <li>
            <strong>Analitika (uz pristanak):</strong> podatke o poseti sajtu prikupljamo tek nakon
            što prihvatiš kolačiće (vidi odeljak 6).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Svrha i pravni osnov obrade">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Pružanje usluge</strong> (izvršenje ugovora, čl. 12. st. 1. tač. 2 ZZPL) —
            nalog, prijava, funkcionalnosti aplikacije, naplata.
          </li>
          <li>
            <strong>Bezbednost i sprečavanje zloupotreba</strong> (legitimni interes, čl. 12. st. 1.
            tač. 6 ZZPL).
          </li>
          <li>
            <strong>Analitika i marketing</strong> (pristanak, čl. 12. st. 1. tač. 1 ZZPL) —
            isključivo nakon tvog pristanka, koji možeš povući u svakom trenutku.
          </li>
          <li>
            <strong>Ispunjenje zakonskih obaveza</strong> (čl. 12. st. 1. tač. 3 ZZPL) — npr.
            računovodstveni propisi.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sa kim delimo podatke (obrađivači)">
        <p>
          Podatke ne prodajemo. Delimo ih samo sa pružaocima usluga koji ih obrađuju u naše ime, na
          osnovu ugovora o obradi:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Supabase</strong> (baza podataka i autentifikacija) — podaci se čuvaju u regionu
            [REGION, npr. EU/Frankfurt].
          </li>
          <li>
            <strong>Vercel</strong> (hosting aplikacije).
          </li>
          <li>[PROVAJDER PLAĆANJA] (obrada plaćanja).</li>
          <li>[DOPUNI: analitika, email servis, AI provajder ako se koristi...]</li>
        </ul>
        <p>
          Pojedini obrađivači mogu obrađivati podatke van Republike Srbije. U tom slučaju prenos se
          vrši u države koje obezbeđuju primereni nivo zaštite ili uz odgovarajuće mere zaštite u
          skladu sa čl. 63–70. ZZPL.
        </p>
      </LegalSection>

      <LegalSection title="5. Koliko dugo čuvamo podatke">
        <p>
          Podatke o nalogu čuvamo dok nalog postoji. Nakon brisanja naloga podaci se brišu u roku od
          [ROK, npr. 30 dana], osim podataka koje smo dužni da čuvamo po zakonu (npr. računi — u
          rokovima iz računovodstvenih propisa).
        </p>
      </LegalSection>

      <LegalSection title="6. Kolačići i analitika">
        <p>
          Neophodni kolačići (sesija prijave) postavljaju se uvek jer bez njih usluga ne radi.
          Analitički i marketinški kolačići postavljaju se <strong>tek nakon tvog pristanka</strong>{" "}
          kroz baner za kolačiće; pristanak možeš povući brisanjem kolačića u pregledaču.
          [PRILAGODI: nabroj alate — npr. Google Analytics, Meta Pixel — ako su uključeni]
        </p>
      </LegalSection>

      <LegalSection title="7. Tvoja prava">
        <p>Po ZZPL imaš pravo na:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>pristup podacima koje o tebi obrađujemo,</li>
          <li>ispravku netačnih i dopunu nepotpunih podataka,</li>
          <li>brisanje podataka ("pravo na zaborav"),</li>
          <li>ograničenje obrade i prigovor na obradu,</li>
          <li>prenosivost podataka,</li>
          <li>povlačenje pristanka (bez uticaja na obradu pre povlačenja).</li>
        </ul>
        <p>
          Zahtev nam pošalji na [EMAIL ZA PRIVATNOST] — odgovaramo bez odlaganja, a najkasnije u
          roku od 30 dana. Imaš i pravo pritužbe{" "}
          <strong>Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti</strong>{" "}
          (Bulevar kralja Aleksandra 15, Beograd; www.poverenik.rs).
        </p>
      </LegalSection>

      <LegalSection title="8. Bezbednost">
        <p>
          Primenjujemo tehničke i organizacione mere zaštite: enkripciju u prenosu (HTTPS), kontrolu
          pristupa na nivou baze podataka (izolacija podataka po korisniku), heširanje lozinki i
          ograničen pristup podacima unutar tima.
        </p>
      </LegalSection>

      <LegalSection title="9. Izmene ove politike">
        <p>
          O suštinskim izmenama obavestićemo te emailom ili obaveštenjem u aplikaciji pre nego što
          stupe na snagu. Aktuelna verzija je uvek objavljena na ovoj stranici.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
