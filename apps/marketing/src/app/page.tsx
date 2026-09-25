import { FreeTipsCta } from "@/components/content/free-tips-cta";
import { TopicCards } from "@/components/content/topic-cards";
import { JsonLd, faqJsonLd } from "@/components/json-ld";
import { FAQSection, faqItems } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { getPublishedPosts } from "@/lib/blog";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH, biljke } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH, zdravljeTeme } from "@/lib/content/zdravlje";
import { BUSINESS_PATH, FREE_TIPS_PATH } from "@/lib/nav";
import { PRODUCTS_SITE_LABEL, PRODUCTS_SITE_URL } from "@/lib/site";
import { ArrowRight, Briefcase, Leaf } from "lucide-react";
import Link from "next/link";

// Poslednji blog tekstovi dolaze iz baze — osveži početnu bar jednom na sat.
export const revalidate = 3600;

export default async function HomePage() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-16 text-center sm:pt-24">
        <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 font-medium text-primary text-sm">
          <Leaf className="size-4" />
          Portal o sibirskoj prirodi i zdravom životu
        </p>
        <h1 className="mx-auto max-w-3xl font-bold text-4xl text-ink leading-tight sm:text-5xl">
          Snaga sibirske prirode — znanje o biljkama, adaptogenima i zdravlju
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Šisandra, eleuterokok, rodiola, čaga i druge biljke tajge: odakle potiču, šta o njima kaže
          tradicija, a šta nauka. Jasno, na srpskom i bez praznih obećanja.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={BILJKE_PATH}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Istraži sibirske biljke
          </Link>
          <Link
            href={FREE_TIPS_PATH}
            className="rounded-lg border px-6 py-3 font-medium text-ink hover:border-primary hover:text-primary"
          >
            Besplatni saveti
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-bold text-2xl text-ink sm:text-3xl">Sibirske biljke</h2>
            <p className="mt-2 text-muted-foreground">
              Biljke tajge, Altaja i Dalekog istoka koje su obeležile istoriju adaptogena.
            </p>
          </div>
          <Link
            href={BILJKE_PATH}
            className="inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
          >
            Sve biljke
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8">
          <TopicCards items={biljke} basePath={BILJKE_PATH} />
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="font-medium text-primary text-sm">Adaptogeni</p>
            <h2 className="mt-2 font-bold text-2xl text-ink sm:text-3xl">
              Šta su adaptogeni i zašto se vezuju za Sibir?
            </h2>
          </div>
          <div>
            <p className="text-ink/85 leading-relaxed">
              Pojam „adaptogen“ nastao je u Sovjetskom Savezu 1947. godine, a prve biljke koje su
              detaljno istraživane rasle su upravo u Sibiru i na Dalekom istoku. Saznajte šta taj
              pojam znači, koje biljke se u adaptogene ubrajaju i šta o njima kaže evropska
              regulativa.
            </p>
            <Link
              href={ADAPTOGENI_PATH}
              className="mt-5 inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              Pročitaj o adaptogenima
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-bold text-2xl text-ink sm:text-3xl">Zdravlje</h2>
            <p className="mt-2 text-muted-foreground">
              Imunitet, energija, ishrana i navike — praktično i bez preterivanja.
            </p>
          </div>
          <Link
            href={ZDRAVLJE_PATH}
            className="inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
          >
            Sve teme
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8">
          <TopicCards items={zdravljeTeme} basePath={ZDRAVLJE_PATH} />
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-bold text-2xl text-ink sm:text-3xl">Sa bloga</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
            >
              Svi tekstovi
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border bg-card p-6 hover:border-primary"
              >
                <h3 className="font-semibold text-ink group-hover:text-primary">{post.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-muted-foreground text-sm">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <FeaturesSection />

      <section className="mx-auto max-w-5xl px-6">
        <FreeTipsCta />
      </section>

      <FAQSection />
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8">
            <Briefcase className="size-6 text-primary" />
            <h2 className="mt-3 font-semibold text-ink text-xl">Poslovna prilika</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Postanite Privilegovani klijent ili Konsultant kompanije Siberian Wellness.
            </p>
            <Link
              href={BUSINESS_PATH}
              className="mt-5 inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
            >
              Saznaj više
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border bg-card p-8">
            <Leaf className="size-6 text-primary" />
            <h2 className="mt-3 font-semibold text-ink text-xl">Tražite proizvode?</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Na ovom portalu ne prodajemo proizvode. Siberian Wellness asortiman pogledajte na
              sajtu {PRODUCTS_SITE_LABEL}.
            </p>
            <a
              href={PRODUCTS_SITE_URL}
              className="mt-5 inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
            >
              Pogledaj proizvode
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
