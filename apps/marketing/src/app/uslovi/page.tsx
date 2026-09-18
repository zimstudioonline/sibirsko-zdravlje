import { LegalPage, LegalSection } from "@/components/legal";

export const metadata = {
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja Sibirsko Zdravlje usluge.",
};

/**
 * Šablon uslova korišćenja za SaaS iz Srbije — oslonjen na Zakon o
 * obligacionim odnosima, Zakon o elektronskoj trgovini i Zakon o zaštiti
 * potrošača RS. Popuni [placeholder] polja i prilagodi svom modelu naplate.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Uslovi korišćenja" updated="[DATUM]">
      <LegalSection title="1. O ovim uslovima">
        <p>
          Ove uslove korišćenja primenjuje <strong>[PUNO POSLOVNO IME]</strong>, [ADRESA], matični
          broj [MATIČNI BROJ], PIB [PIB], email [KONTAKT EMAIL] (u daljem tekstu: "
          {"Sibirsko Zdravlje"}", "mi"). Korišćenjem usluge prihvataš ove uslove — ako se sa njima
          ne slažeš, nemoj koristiti uslugu.
        </p>
        <p>
          Usluga je namenjena [poslovnim korisnicima / potrošačima / oboje — PRILAGODI]. Na odnose
          sa potrošačima primenjuju se i odredbe Zakona o zaštiti potrošača Republike Srbije.
        </p>
      </LegalSection>

      <LegalSection title="2. Usluga">
        <p>
          {"Sibirsko Zdravlje"} je softver koji se koristi preko interneta (SaaS) i omogućava [OPIS
          USLUGE — šta proizvod radi, jednom rečenicom]. Uslugu pružamo "takvu kakva jeste", uz
          razumne napore da bude dostupna neprekidno; povremeni prekidi zbog održavanja ili više
          sile su mogući.
        </p>
      </LegalSection>

      <LegalSection title="3. Nalog">
        <p>
          Za korišćenje usluge potreban je nalog. Odgovoran si za tačnost podataka i čuvanje
          pristupnih podataka; sve što se uradi sa tvog naloga smatra se tvojom radnjom, osim ako
          nas bez odlaganja obavestiš o zloupotrebi. Nalog može otvoriti lice sa navršenih [15/18]
          godina.
        </p>
      </LegalSection>

      <LegalSection title="4. Cene i plaćanje">
        <p>
          Cene su istaknute na stranici sa cenama i iskazane su [u evrima / dinarima; sa/bez PDV-a —
          PRILAGODI]. Pretplata se naplaćuje unapred za obračunski period [mesečno / godišnje] preko
          [PROVAJDER PLAĆANJA]. Pretplatu možeš otkazati u svakom trenutku — usluga ostaje aktivna
          do isteka plaćenog perioda. [PRILAGODI politiku povraćaja novca.]
        </p>
        <p>
          Ako si potrošač u smislu Zakona o zaštiti potrošača: pravo na odustanak od ugovora
          zaključenog na daljinu u roku od 14 dana ne važi za digitalni sadržaj čije je izvršenje
          počelo uz tvoju izričitu saglasnost — što potvrđuješ aktiviranjem plaćene usluge.
          Reklamacije primamo na [KONTAKT EMAIL] i odgovaramo u zakonskom roku od 8 dana.
        </p>
      </LegalSection>

      <LegalSection title="5. Dozvoljeno korišćenje">
        <p>Nije dozvoljeno:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>korišćenje usluge suprotno propisima Republike Srbije,</li>
          <li>narušavanje bezbednosti, preopterećivanje ili zaobilaženje ograničenja usluge,</li>
          <li>deljenje naloga sa trećim licima ili preprodaja usluge bez našeg pristanka,</li>
          <li>postavljanje sadržaja kojim se krše tuđa prava (autorska, žig, privatnost...).</li>
        </ul>
        <p>Zadržavamo pravo da nalog koji krši ove uslove privremeno ograničimo ili ugasimo.</p>
      </LegalSection>

      <LegalSection title="6. Tvoj sadržaj i naši podaci">
        <p>
          Sadržaj koji uneseš ostaje tvoj. Daješ nam neisključivu licencu da ga skladištimo i
          obrađujemo isključivo radi pružanja usluge. Softver, dizajn i žig {"Sibirsko Zdravlje"} su
          naše vlasništvo. Obrada podataka o ličnosti uređena je{" "}
          <a href="/privatnost" className="text-primary underline underline-offset-4">
            Politikom privatnosti
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Odgovornost">
        <p>
          U najvećoj meri dozvoljenoj prinudnim propisima, ne odgovaramo za posrednu štetu ni za
          izmaklu dobit nastalu korišćenjem ili nemogućnošću korišćenja usluge. Naša ukupna
          odgovornost ograničena je na iznos koji si nam platio u poslednjih 12 meseci. Ograničenja
          ne važe tamo gde ih zakon isključuje (namera, gruba nepažnja, prava potrošača).
        </p>
      </LegalSection>

      <LegalSection title="8. Trajanje i raskid">
        <p>
          Ugovor se zaključuje na neodređeno vreme. Možeš ga raskinuti brisanjem naloga ili
          otkazivanjem pretplate. Mi ga možemo raskinuti uz otkazni rok od [30] dana, odnosno bez
          otkaznog roka u slučaju bitne povrede ovih uslova. Nakon prestanka, podaci se brišu u
          skladu sa Politikom privatnosti.
        </p>
      </LegalSection>

      <LegalSection title="9. Izmene uslova">
        <p>
          Uslove možemo izmeniti; o suštinskim izmenama obaveštavamo te najmanje [15] dana pre
          stupanja na snagu, emailom ili u aplikaciji. Nastavak korišćenja nakon tog roka smatra se
          prihvatanjem izmena — a ako se ne slažeš, možeš raskinuti ugovor pre stupanja izmena na
          snagu.
        </p>
      </LegalSection>

      <LegalSection title="10. Merodavno pravo i sporovi">
        <p>
          Na ove uslove primenjuje se pravo Republike Srbije. Sporove ćemo prvo pokušati da rešimo
          dogovorom; u suprotnom, nadležan je sud u [MESTO, npr. Beogradu], osim ako je za potrošače
          zakonom određena druga nadležnost. Potrošači mogu koristiti i vansudsko rešavanje
          potrošačkih sporova u skladu sa Zakonom o zaštiti potrošača.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
