import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

/**
 * OpenNext konfiguracija za Cloudflare Workers deploy.
 *
 * KV incremental cache (vidi napomenu u wrangler.jsonc) — bez njega svaki
 * Worker isolate renderuje statičke stranice nezavisno na hladnom startu,
 * što je za /katalog (166 proizvoda odjednom) obaralo Cloudflare-ov CPU
 * resource limit.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
