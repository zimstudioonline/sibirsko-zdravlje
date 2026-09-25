import { getPublishedPosts } from "@/lib/blog";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH, biljke } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH, zdravljeTeme } from "@/lib/content/zdravlje";
import { BUSINESS_PATH, FREE_TIPS_PATH } from "@/lib/nav";
import { marketingEnv } from "@repo/config/marketing-env";
import type { MetadataRoute } from "next";

// Moduli mogu da dodaju dinamičke stavke (npr. blog objave) — osveži bar na sat.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}${BILJKE_PATH}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}${ADAPTOGENI_PATH}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}${ZDRAVLJE_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/o-nama`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}${FREE_TIPS_PATH}`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}${BUSINESS_PATH}`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privatnost`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/uslovi`, changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const biljka of biljke) {
    entries.push({
      url: `${base}${BILJKE_PATH}/${biljka.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const tema of zdravljeTeme) {
    entries.push({
      url: `${base}${ZDRAVLJE_PATH}/${tema.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  entries.push({ url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 });
  for (const post of await getPublishedPosts()) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  // @ludus:inject:sitemap:entries
  return entries;
}
