import { SITE_NAME } from "@/lib/site";
import { marketingEnv } from "@repo/config/marketing-env";
import type { Metadata } from "next";

/** Jedinstven način da stranica dobije kompletan metadata blok (OG + canonical). */
export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  const url = `${base}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "sr_RS",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
