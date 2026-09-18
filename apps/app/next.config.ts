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
  transpilePackages: ["@repo/auth", "@repo/config", "@repo/db", "@repo/payments", "@repo/ui"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
