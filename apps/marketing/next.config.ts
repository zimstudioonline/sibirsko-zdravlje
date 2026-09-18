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

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/config", "@repo/ui"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;

// Registruje Cloudflare bindings (env, cache) u `next dev` — bez ovoga
// lokalni razvoj ne vidi Workers runtime, samo je aktivan pri build/deploy.
initOpenNextCloudflareForDev();
