#!/usr/bin/env node
// Import scraped blog posts (posts.json, sitting next to this script) into
// the Supabase `posts` table.
//
// NOT run automatically by anyone else — this is a one-off migration tool
// for the ~20 posts scraped from the old WordPress blog
// (sibirskozdravlje.com/blog/). Run it yourself, once local Supabase (or a
// real Supabase project) is up and `bun run db:migrate` has been applied:
//
//   bun run apps/marketing/scripts/blog-import/import-posts.mjs
//   # or: node apps/marketing/scripts/blog-import/import-posts.mjs
//
// Idempotent: upserts on `slug`, so re-running it is safe and won't create
// duplicates or fail on conflict.
//
// Credentials: read from the repo's .env — SUPABASE_SERVICE_ROLE_KEY and
// NEXT_PUBLIC_SUPABASE_URL (same names as packages/config/src/env.ts).
// Service-role is required because `posts` intentionally has no
// INSERT/UPDATE policy (see packages/db/migrations/0001_blog_posts.sql) —
// all writes go through service-role in the admin portal, and this script
// mimics that.

import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// scripts/blog-import -> apps/marketing -> apps -> repo root
const REPO_ROOT = path.resolve(__dirname, "../../../..");

function loadEnvFile(envPath) {
  if (!existsSync(envPath)) return {};
  const raw = readFileSync(envPath, "utf8");
  const vars = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

// Prefer already-set process.env (e.g. running under `bun run`, which
// auto-loads .env), otherwise parse the repo-root .env ourselves so this
// also works under plain `node`.
const envFromFile = loadEnvFile(path.join(REPO_ROOT, ".env"));
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? envFromFile.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? envFromFile.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Nedostaju NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Pokreni `bun run local:setup` (lokalno) ili popuni .env (produkcija) pa probaj ponovo.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const postsPath = path.join(__dirname, "posts.json");
if (!existsSync(postsPath)) {
  console.error(`Ne postoji ${postsPath}`);
  process.exit(1);
}
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

// Space out published_at across the scraped dates so ordering on the blog
// index matches the old site (already extracted per-post from the WP page's
// visible publish date — see build.mjs in this same folder for how
// posts.json was produced). Fall back to "now" only if a post is somehow
// missing one.
function publishedAtFor(post) {
  return post.publishedAt ?? new Date().toISOString();
}

async function main() {
  console.log(`Importuje ${posts.length} objava u "posts" tabelu (${SUPABASE_URL})...`);
  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const post of posts) {
    const { data: existing, error: readError } = await supabase
      .from("posts")
      .select("id, published_at")
      .eq("slug", post.slug)
      .maybeSingle();

    if (readError) {
      console.error(`✗ ${post.slug}: čitanje nije uspelo — ${readError.message}`);
      failed++;
      continue;
    }

    const row = {
      slug: post.slug,
      title: post.title,
      description: post.description ?? "",
      content: post.content,
      published: true,
      // published_at se ne resetuje ako objava već postoji (isti obrazac kao
      // admin akcije u apps/app/src/app/admin/blog/actions.ts).
      published_at: existing?.published_at ?? publishedAtFor(post),
    };

    if (existing) {
      const { error } = await supabase.from("posts").update(row).eq("id", existing.id);
      if (error) {
        console.error(`✗ ${post.slug}: update nije uspeo — ${error.message}`);
        failed++;
        continue;
      }
      updated++;
      console.log(`↻ ${post.slug} (ažurirano)`);
    } else {
      const { error } = await supabase.from("posts").insert(row);
      if (error) {
        console.error(`✗ ${post.slug}: insert nije uspeo — ${error.message}`);
        failed++;
        continue;
      }
      created++;
      console.log(`+ ${post.slug} (kreirano)`);
    }
  }

  console.log(`\nGotovo: ${created} kreirano, ${updated} ažurirano, ${failed} neuspešno.`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
