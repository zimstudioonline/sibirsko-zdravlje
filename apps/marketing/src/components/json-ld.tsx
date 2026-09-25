import { SITE_NAME } from "@/lib/site";
import { marketingEnv } from "@repo/config/marketing-env";

/**
 * JSON-LD schema markup — hrana za pretraživače i AI asistente (AEO).
 * Builderi vraćaju objekte; render ide kroz <JsonLd />.
 */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape "<" sprečava </script> breakout ako sadržaj ikad postane dinamičan.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify + escape, bez sirovog user inputa
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function organizationJsonLd(): Record<string, unknown> {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: base,
    logo: `${base}/logo-sibirska-priroda.png`,
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  date: string;
  slug: string;
}): Record<string, unknown> {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `${base}/blog/${article.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: base },
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}
