import { getPublishedPosts } from "@/lib/blog";
import { categories } from "@/lib/catalog";
import { marketingEnv } from "@repo/config/marketing-env";
import type { MetadataRoute } from "next";

// Moduli mogu da dodaju dinamičke stavke (npr. blog objave) — osveži bar na sat.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/katalog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/upit-za-proizvode`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/prikljuci-se`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privatnost`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/uslovi`, changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const category of categories) {
    entries.push({
      url: `${base}/katalog/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
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
