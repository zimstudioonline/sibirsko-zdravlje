import { marketingEnv } from "@repo/config/marketing-env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = marketingEnv().NEXT_PUBLIC_MARKETING_URL;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
