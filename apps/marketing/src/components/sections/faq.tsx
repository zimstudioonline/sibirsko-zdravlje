import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui";

/**
 * FAQ sekcija (accordion). Ako je uključen seo-aeo modul, dodaj i
 * faqJsonLd(faqItems) u layout — FAQ schema je najjači AEO signal.
 */

export const faqItems = [
  {
    question: "Kako da poručim proizvod?",
    answer:
      "Pošaljite upit sa naziva proizvoda koji vas interesuje kroz formu na stranici „Upit za proizvode” ili nam pišite na Viber/telefon. Konsultant vam odgovara sa cenom, dostupnošću i uslovima dostave.",
  },
  {
    question: "Da li su proizvodi originalni?",
    answer:
      "Da — sve proizvode nabavljamo isključivo preko zvanične distribucije Siberian Wellness kompanije, bez posrednika.",
  },
  {
    question: "Koliko traje dostava?",
    answer:
      "[PRILAGODI] Dostava na kućnu adresu u Srbiji traje uobičajeno 1–3 radna dana od potvrde porudžbine. Tačan rok i način dostave dogovaramo prilikom potvrde upita.",
  },
  {
    question: "Da li slanje upita obavezuje na kupovinu?",
    answer:
      "Ne. Upit je besplatan i bez obaveze — služi da dobijete tačnu cenu, dostupnost i odgovore na pitanja pre nego što se odlučite.",
  },
  {
    question: "Kako mogu da postanem Siberian Wellness konsultant?",
    answer:
      "Posetite stranicu „Priključi se” ili nam pišite direktno — objasnićemo vam uslove i sledeće korake.",
  },
  {
    question: "Ne znam koji proizvod mi odgovara, možete li da mi pomognete?",
    answer:
      "Naravno — opišite u upitu šta vas muči ili šta tražite (npr. podrška imunitetu, energija, koža) i predložićemo odgovarajući proizvod iz kataloga.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-bold text-3xl text-ink">Česta pitanja</h2>
        <p className="mt-4 text-muted-foreground">
          Ne vidiš odgovor koji tražiš? Piši nam — rado pomažemo.
        </p>
      </div>
      <Accordion type="single" collapsible className="mt-10 w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
