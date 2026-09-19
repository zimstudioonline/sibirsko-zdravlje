import { BackToTopButton } from "@/components/back-to-top-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { marketingEnv } from "@repo/config/marketing-env";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { JsonLd, organizationJsonLd } from "@/components/json-ld";
import { ViberButton } from "@/components/viber-button";
import { ConsentBanner } from "@repo/ui/consent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(marketingEnv().NEXT_PUBLIC_MARKETING_URL),
  title: {
    default: "Sibirsko Zdravlje",
    template: "%s | Sibirsko Zdravlje",
  },
  description:
    "Katalog Siberian Wellness proizvoda — suplementi, kozmetika i biljni čajevi. Pošaljite upit za cenu i dostupnost.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr">
      <body
        className={`${spaceGrotesk.variable} flex min-h-screen flex-col bg-paper font-sans text-ink antialiased`}
      >
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ViberButton />
        <BackToTopButton />
        <JsonLd data={organizationJsonLd()} />
        {/* @ludus:inject:seo:jsonld */}
        <ConsentBanner />
        <GoogleAnalytics />
        <MetaPixel />
        {/* @ludus:inject:analytics:scripts */}
      </body>
    </html>
  );
}
