import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import "../../packages/config/env-load.mjs";

/**
 * Konzervativni security headeri — bezbedan default koji ništa ne lomi.
 * Strogi CSP je namerno izostavljen: zahteva nonce setup i allowlist za
 * analitiku, pa ga uvodi tek onaj kome zatreba (vidi CLAUDE.md, Bezbednost).
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * Stari katalog (/katalog, /upit-za-proizvode) je uklonjen — portal je
 * edukacija + funnel, a proizvodi su na SibirskoZdravlje.com (WooCommerce,
 * proizvodi na /p/<slug>/). Blog tekstovi i dalje linkuju na
 * /katalog/proizvod/<slug>, pa svaki stari link vodi na isti proizvod tamo.
 * Za 133 od 166 proizvoda slug je identičan; ovde su samo oni koji se
 * razlikuju (WordPress slugovi sa „№“ i ćirilicom su već URL-enkodovani).
 */
const PRODUCTS_SITE = "https://sibirskozdravlje.com";
const RENAMED_PRODUCT_SLUGS: Record<string, string> = {
  "essential-botanics-ginkgo-i-baikal-skullcap": "essential-botanics-ginkgobaikal-skullcap",
  "essential-botanics-bearberry-i-lingonberry": "essential-botanics-bearberrylingonberry",
  "essential-botanics-valerian-i-melissa": "essential-botanics-valerianmelissa",
  "essential-botanics-aronia-i-lutein": "essential-botanics-aronialutein",
  "fito-caj-od-divljeg-bilja-1-ciscenje-i-drenaza":
    "fito-caj-od-divljeg-bilja-%E2%84%96-1-ciscenje-i-drenaza",
  "3d-hair-i-nails-cube-lepota-kose-i-noktiju": "3d-hairnails-cube-lepota-kose-i-noktiju",
  "siberian-wellness-fito-caj-od-divljeg-bilja-4-lagani-dah":
    "siberian-wellness-fito-caj-od-divljeg-bilja-%E2%84%96-4",
  "chronolong-women-s-health": "chronolong-womens-health",
  "trimegavitals-all-natural-beta-carotene-i-sea-buckthorn-oil":
    "trimegavitals-all-natural-beta-carotenesea-buckthorn-oil",
  "fito-caj-od-divljeg-bilja-2-zenska-harmonija": "fito-caj-od-divljeg-bilja-%E2%84%96-2",
  "siberian-wellness-fito-caj-od-divljeg-bilja-3-prirodni-antistres":
    "siberian-wellness-fito-caj-od-divljeg-bilja-%E2%84%96-3",
  "fito-caj-od-divljeg-bilja-5-komforno-varenje": "fito-caj-od-divljeg-bilja-%E2%84%96-5",
  "fito-caj-od-divljeg-bilja-6-zastita-jetre":
    "fito-caj-od-divljeg-bilja-%E2%84%96-6-zastita-jetre",
  "fito-caj-od-divljeg-bilja-7-lakoca-pokreta":
    "fito-caj-od-divljeg-bilja-%E2%84%96-7-lakoca-pokreta",
  "fito-caj-od-divljeg-bilja-8-komfor-za-srce": "fito-caj-od-divljeg-bilja-%E2%84%96-8",
  "fito-caj-od-divljeg-bilja-9-kontrola-ugljenih-hidrata": "fito-caj-od-divljeg-bilja-%E2%84%96-9",
  "bcaa-complex-fitness-catalist": "bcaa-complex",
  "gluco-box-kontrola-ugljenih-hidrata": "gluco-box-kontrola-ugljenih-hidratahidrata",
  "omegalodon-multifruit-kompleks-omega-3-kiselina-vitamama":
    "omegalodon-multifruit-kompleks-omega-3-kiselina",
  "balzam-za-telo-spongilla-i-gavez-zivokost-siberian-wellness":
    "balzam-za-telo-spongillagavez-zivokost-siberian-wellness",
  "age-theraru-antioxidants-women-s-health": "age-%D1%82h%D0%B5r%D0%B0%D1%80%D1%83-antioxidants",
  "methylfolate-women-s-health": "methylfolate-womens-health",
  "d-manoza-i-severna-brusnica-women-s-health": "d-manoza-i-severna-brusnica-womens-health",
  "iron-bisglycinate-women-s-health": "iron-bisglycinate-womens-health",
  "hijaluronska-kiselina-i-prirodni-vitamin-c-women-s-health":
    "hijaluronska-kiselina-i-prirodni-vitamin-c-womens-health",
  "men-s-power-maca-zinc-l-carnitine-fitness-catalist":
    "mens-power-macazincl-carnitine-fitness-catalist",
  "taurin-fitness-catalist": "%D1%82%D0%B0urin-fitness-catalist",
  "essential-fatty-acids-siberian-linseed-oil-i-omega-3":
    "essential-fatty-acids-siberian-linseed-oilomega-3",
  "dry-and-solored-hair-sonditioner-siberian-wellness":
    "dry-and-%D1%81olored-hair-%D1%81onditioner-siberian-wellness",
  "lion-s-mane-i-cordyceps-essential-botanics": "lions-mane-cordyceps-essential-botanics",
  "lutein-i-zeaxanthin-essential-fatty-acids": "lutein-zeaxanthin-essential-fatty-acids",
  "fito-caj-od-divljeg-bilja-11-energija-i-vitalnost": "fito-caj-od-divljeg-bilja-%E2%84%9611",
  "fito-caj-od-divljeg-bilja-10-podrska-bubrezima": "fito-caj-od-divljeg-bilja-%E2%84%9610",
};

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/config", "@repo/ui"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/prikljuci-se", destination: "/poslovna-prilika", statusCode: 301 },
      {
        source: "/upit-za-proizvode",
        destination: `${PRODUCTS_SITE}/upit-za-proizvode/`,
        statusCode: 301,
      },
      ...Object.entries(RENAMED_PRODUCT_SLUGS).map(([from, to]) => ({
        source: `/katalog/proizvod/${from}`,
        destination: `${PRODUCTS_SITE}/p/${to}/`,
        statusCode: 301 as const,
      })),
      {
        source: "/katalog/proizvod/:slug",
        destination: `${PRODUCTS_SITE}/p/:slug/`,
        statusCode: 301,
      },
      { source: "/katalog", destination: `${PRODUCTS_SITE}/`, statusCode: 301 },
      { source: "/katalog/:path*", destination: `${PRODUCTS_SITE}/`, statusCode: 301 },
    ];
  },
};

export default nextConfig;

// Registruje Cloudflare bindings (env, cache) u `next dev` — bez ovoga
// lokalni razvoj ne vidi Workers runtime, samo je aktivan pri build/deploy.
initOpenNextCloudflareForDev();
