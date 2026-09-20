import { FAQSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { categories } from "@/lib/catalog";
import { marketingEnv } from "@repo/config/marketing-env";
import { Card, CardContent } from "@repo/ui";
import { Quote } from "lucide-react";
import Link from "next/link";

const istaknuteKategorije = [
  "suplementi-za-imunitet",
  "antistres-zastita",
  "elasticni-zglobovi",
  "anti-age-proizvode",
  "detoks-i-ciscenje-organizma",
  "kozmetika",
];

const poznateLinije = [
  { slug: "3d-cube", label: "3D Cube" },
  { slug: "adaptovit", label: "Adaptovit" },
  { slug: "essential-botanics", label: "Essential linija" },
  { slug: "sibirski-balzami", label: "Sibirski balzami" },
  { slug: "kolekcija-fitocajeva", label: "Kolekcija fitočajeva" },
  { slug: "kozmetika-siberian-wellness", label: "Kozmetika" },
];

const utisci = [
  {
    quote: "Osećam se lakše, imam više energije, a probava mi je konačno dovedena u red.",
    author: "Korisnica Limfosana",
  },
  {
    quote: "Pomoglo mi je da se izborim sa stresom i poboljšam koncentraciju u užurbanom danu.",
    author: "Korisnik Adaptovita",
  },
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

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-center font-bold text-2xl text-ink">
          Siberian Wellness — prirodni suplementi i kozmetika
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Siberian Wellness je svetski poznat brend prirodnih suplemenata, čajeva i kozmetike,
          inspirisan snagom sibirske prirode i podržan naučnim istraživanjima. Više od 25 godina
          proizvodi se razvijaju uz strogu kontrolu kvaliteta i sastojke iz netaknute sibirske tajge
          — za jačanje imuniteta, više energije, zdraviju kožu i opšte dobro osećanje.
        </p>
        <div className="mx-auto mt-8 aspect-video max-w-2xl overflow-hidden rounded-xl border">
          <iframe
            src="https://www.youtube-nocookie.com/embed/5ppfh1fqeNA"
            title="Siberian Wellness"
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center font-bold text-2xl text-ink">Poznate linije proizvoda</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {poznateLinije.map((linija) => {
            const category = categories.find((item) => item.slug === linija.slug);
            if (!category) return null;
            return (
              <Link
                key={linija.slug}
                href={`/katalog/${linija.slug}`}
                className="rounded-xl border bg-card px-4 py-6 text-center font-medium text-ink text-sm hover:border-primary hover:text-primary"
              >
                {linija.label}
              </Link>
            );
          })}
        </div>
      </section>

      <FeaturesSection />

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-center font-bold text-2xl text-ink">Utisci korisnika</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {utisci.map((utisak) => (
            <Card key={utisak.author}>
              <CardContent className="p-6">
                <Quote className="size-6 text-primary/40" />
                <p className="mt-3 text-ink/80 text-sm italic">"{utisak.quote}"</p>
                <p className="mt-4 font-medium text-muted-foreground text-sm">— {utisak.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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
