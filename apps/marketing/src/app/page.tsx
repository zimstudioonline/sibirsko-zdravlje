import { FAQSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { categories } from "@/lib/catalog";
import { marketingEnv } from "@repo/config/marketing-env";
import Link from "next/link";

const istaknuteKategorije = [
  "suplementi-za-imunitet",
  "antistres-zastita",
  "elasticni-zglobovi",
  "anti-age-proizvode",
  "detoks-i-ciscenje-organizma",
  "kozmetika",
];

export default function HomePage() {
  const phone = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 font-medium text-primary text-sm">
          Siberian Wellness konsultant
        </p>
        <h1 className="mx-auto max-w-2xl font-bold text-5xl text-ink leading-tight">
          Prirodni proizvodi za zdravlje, negu i energiju
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Suplementi, kozmetika i biljni čajevi iz Siberian Wellness asortimana. Pošaljite upit i
          dobijate cenu i savet konsultanta — bez obaveze.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/katalog"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Pogledaj katalog
          </Link>
          <a
            href={`viber://chat?number=%2B${phone}`}
            className="rounded-lg border px-6 py-3 font-medium text-ink hover:bg-accent"
          >
            Piši na Viber
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center font-bold text-2xl text-ink">Popularne kategorije</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {istaknuteKategorije.map((slug) => {
            const category = categories.find((item) => item.slug === slug);
            if (!category) return null;
            return (
              <Link
                key={slug}
                href={`/katalog/${slug}`}
                className="rounded-xl border bg-card px-4 py-6 text-center font-medium text-ink text-sm hover:border-primary hover:text-primary"
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </section>

      <FeaturesSection />
      <FAQSection />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-bold text-3xl">Niste sigurni šta vam odgovara?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Pošaljite upit — konsultant vam odgovara sa predlogom proizvoda i cenom, bez obaveze.
          </p>
          <Link
            href="/upit-za-proizvode"
            className="mt-8 inline-block rounded-lg bg-background px-6 py-3 font-medium text-ink hover:bg-background/90"
          >
            Pošalji upit
          </Link>
        </div>
      </section>
    </main>
  );
}
