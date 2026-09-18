import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Minimalna OpenNext konfiguracija za Cloudflare Workers deploy.
 * Bez R2 incremental cache override-a — vidi napomenu u wrangler.jsonc.
 */
export default defineCloudflareConfig();
