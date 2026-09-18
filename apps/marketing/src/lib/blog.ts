import { marketingEnv } from "@repo/config/marketing-env";
import { createClient } from "@supabase/supabase-js";

/**
 * Blog objave iz Supabase — anon klijent, RLS pušta isključivo objavljene
 * (`published = true`). Marketing radi i BEZ Supabase ključeva (poseban Vercel
 * projekat) — tada je blog prazan, to je očekivan fallback, ne greška.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string | null;
}

interface PostRow {
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string | null;
}

const POST_COLUMNS = "slug, title, description, content, published_at";

function blogClient() {
  const env = marketingEnv();
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

function toPost(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    publishedAt: row.published_at,
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = blogClient();
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .order("published_at", { ascending: false });
  if (error) {
    throw new Error(`Čitanje blog objava nije uspelo: ${error.message}`);
  }
  return ((data ?? []) as PostRow[]).map(toPost);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  // Slug dolazi iz URL-a — pusti samo [a-z0-9-] pre upita.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }
  const supabase = blogClient();
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    throw new Error(`Čitanje blog objave nije uspelo: ${error.message}`);
  }
  return data ? toPost(data as PostRow) : null;
}
