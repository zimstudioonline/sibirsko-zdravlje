import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui";

/**
 * FAQ sekcija (accordion). Ako je uključen seo-aeo modul, dodaj i
 * faqJsonLd(faqItems) u layout — FAQ schema je najjači AEO signal.
 */

export const faqItems = [
  {
    question: "Šta je SibirskaPriroda.com?",
    answer:
      "Edukativni portal o biljkama sibirske tajge, adaptogenima, prirodnim sastojcima i zdravom načinu života. Cilj nam je da jasno i bez preterivanja objasnimo šta kaže tradicija, a šta nauka.",
  },
  {
    question: "Da li na portalu prodajete proizvode?",
    answer:
      "Ne. SibirskaPriroda.com je informativni portal. Ako vas zanimaju Siberian Wellness proizvodi, pogledajte ih na sajtu SibirskoZdravlje.com.",
  },
  {
    question: "Šta su adaptogeni?",
    answer:
      "Pojam koji je 1947. uveo sovjetski farmakolog Nikolaj Lazarev za materije koje povećavaju opštu otpornost organizma na opterećenja. Detaljnije objašnjenje, zajedno sa stavom evropske regulative, pročitajte na stranici Adaptogeni.",
  },
  {
    question: "Da li je sadržaj portala medicinski savet?",
    answer:
      "Ne. Tekstovi su informativnog karaktera i ne zamenjuju pregled i savet lekara. Pre upotrebe biljnih preparata, naročito u trudnoći, dojenju ili uz terapiju, posavetujte se sa lekarom ili farmaceutom.",
  },
  {
    question: "Kako da dobijam besplatne savete?",
    answer:
      "Na stranici „Besplatni saveti” ostavite ime i email. Šaljemo kratke vodiče i nove tekstove, a odjava je moguća u svakom trenutku.",
  },
  {
    question: "Šta je poslovna prilika?",
    answer:
      "Mogućnost da postanete Privilegovani klijent ili Konsultant kompanije Siberian Wellness. Sve detalje i uslove naći ćete na stranici „Poslovna prilika”.",
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
