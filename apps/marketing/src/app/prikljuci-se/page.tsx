import { buildMetadata } from "@/lib/seo";
import { marketingEnv } from "@repo/config/marketing-env";
import { Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "Priključi se",
  description: "Postani Siberian Wellness konsultant — saznaj kako izgleda saradnja.",
  path: "/prikljuci-se",
});

const prednosti = [
  "[PRILAGODI] Fleksibilno radno vreme — radiš kad tebi odgovara.",
  "[PRILAGODI] Popust na sopstvenu kupovinu proizvoda.",
  "[PRILAGODI] Provizija od prodaje i tim bonusi.",
  "[PRILAGODI] Obuka i podrška od prvog dana.",
];

export default function PrikljuciSePage() {
  const phone = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  const email = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-bold text-3xl text-ink sm:text-4xl">Priključi se timu</h1>

      <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
        <strong>Šablon stranice.</strong> Sadržaj ispod je placeholder — zameni tekst o prednostima,
        uslovima uključivanja i procesu saradnje svojim stvarnim ponudama za nove konsultante, pa
        ukloni ovaj okvir.
      </div>

      <p className="mt-6 text-ink/80">
        [PRILAGODI] Postani deo mreže Siberian Wellness konsultanata i gradi sopstveni posao uz
        proizvode u koje veruješ. Kratko objasni ovde kome je ovo namenjeno i šta dobijaju.
      </p>

      <ul className="mt-6 space-y-3">
        {prednosti.map((item) => (
          <li key={item} className="flex items-start gap-3 text-ink/80 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl bg-primary px-6 py-8 text-center text-primary-foreground">
        <h2 className="font-semibold text-xl">Zainteresovan/a si?</h2>
        <p className="mt-2 text-primary-foreground/80 text-sm">
          Javi nam se telefonom, Viberom ili mejlom i objasnićemo ti sledeće korake.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={`viber://chat?number=%2B${phone}`}
            className="rounded-lg bg-background px-5 py-2.5 font-medium text-ink text-sm hover:bg-background/90"
          >
            Piši na Viber
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-lg border border-primary-foreground/40 px-5 py-2.5 font-medium text-sm hover:bg-primary/90"
          >
            Pošalji e-mail
          </a>
        </div>
      </div>
    </main>
  );
}
