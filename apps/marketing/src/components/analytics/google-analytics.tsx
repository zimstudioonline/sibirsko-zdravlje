"use client";

import { marketingEnv } from "@repo/config/marketing-env";
import { useConsent } from "@repo/ui/consent";
import Script from "next/script";

/** GA4 — učitava se ISKLJUČIVO posle pristanka (consent gate). */
export function GoogleAnalytics() {
  const consent = useConsent();
  const measurementId = marketingEnv().NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (consent !== "granted" || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
