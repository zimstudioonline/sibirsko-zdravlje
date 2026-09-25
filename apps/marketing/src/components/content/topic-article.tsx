import { FreeTipsCta } from "@/components/content/free-tips-cta";
import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import type { TopicPage } from "@/lib/content/types";
import type { NavLink } from "@/lib/nav";
import { HEALTH_DISCLAIMER } from "@/lib/site";
import { Info } from "lucide-react";
import Link from "next/link";

function anchorId(heading: string): string {
  return heading
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "dj")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Šablon za sve edukativne stranice: breadcrumb, naslov, uvod, sadržaj
 * (za duže strane), sekcije, napomena, povezane teme i funnel CTA.
 */
export function TopicArticle({
  page,
  currentPath,
  breadcrumbs,
  related,
  relatedTitle = "Povezane teme",
}: {
  page: TopicPage;
  /** URL putanja ove strane, npr. "/sibirske-biljke/rodiola". */
  currentPath: string;
  /** Putanja bez trenutne strane, npr. [{ href: "/", label: "Početna" }]. */
  breadcrumbs: NavLink[];
  related: NavLink[];
  relatedTitle?: string;
}) {
  const showToc = page.sections.length >= 5;
  const crumbs = [
    ...breadcrumbs.map((item) => ({ name: item.label, path: item.href })),
    { name: page.label, path: currentPath },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <nav aria-label="Putanja" className="text-muted-foreground text-sm">
        {breadcrumbs.map((item) => (
          <span key={item.href}>
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
            <span className="mx-2">/</span>
          </span>
        ))}
        <span className="text-ink">{page.label}</span>
      </nav>

      <h1 className="mt-6 font-bold text-3xl text-ink leading-tight sm:text-4xl">{page.title}</h1>
      {page.latinName ? (
        <p className="mt-2 text-muted-foreground italic">{page.latinName}</p>
      ) : null}
      <p className="mt-6 text-ink/85 text-lg leading-relaxed">{page.intro}</p>

      {showToc ? (
        <nav aria-label="Sadržaj" className="mt-8 rounded-xl border bg-card p-5">
          <p className="font-semibold text-ink text-sm">Sadržaj</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {page.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${anchorId(section.heading)}`} className="text-primary hover:underline">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {page.sections.map((section) => (
        <section
          key={section.heading}
          id={anchorId(section.heading)}
          className="mt-10 scroll-mt-24"
        >
          <h2 className="font-semibold text-2xl text-ink">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-ink/85 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <aside className="mt-12 flex gap-3 rounded-xl border bg-muted/50 p-5 text-muted-foreground text-sm">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p>{HEALTH_DISCLAIMER}</p>
      </aside>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-semibold text-ink text-xl">{relatedTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border bg-card px-4 py-2 text-ink text-sm hover:border-primary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <FreeTipsCta className="mt-14" />
    </main>
  );
}
