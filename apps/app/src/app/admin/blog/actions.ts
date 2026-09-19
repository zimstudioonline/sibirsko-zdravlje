"use server";

import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdminClient } from "@repo/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * CRUD nad blog objavama — SAMO za admina (guard u svakoj akciji, server
 * akcija je javno pozivljiv endpoint). Upisi idu kroz service-role jer posts
 * namerno nema INSERT/UPDATE/DELETE politike.
 */

function slugify(value: string): string {
  const map: Record<string, string> = { č: "c", ć: "c", š: "s", ž: "z", đ: "dj" };
  return value
    .toLowerCase()
    .replace(/[čćšžđ]/g, (ch) => map[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface PostInput {
  title: string;
  slug: string;
  description: string;
  content: string;
  published: boolean;
}

function readPostForm(formData: FormData): PostInput | null {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return null;
  }
  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  if (!slug) {
    return null;
  }
  return {
    title,
    slug,
    description: String(formData.get("description") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    published: formData.get("published") === "on",
  };
}

function backWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function createPost(formData: FormData) {
  await requireAdmin();

  const input = readPostForm(formData);
  if (!input) {
    backWithError("/admin/blog/novo", "Naslov je obavezan.");
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("posts")
    .insert({
      slug: input.slug,
      title: input.title,
      description: input.description,
      content: input.content,
      published: input.published,
      published_at: input.published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();
  if (error) {
    backWithError(
      "/admin/blog/novo",
      error.code === "23505"
        ? `Slug "${input.slug}" već postoji — izaberi drugi.`
        : `Čuvanje nije uspelo: ${error.message}`,
    );
  }

  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${data.id}?message=${encodeURIComponent("Objava sačuvana.")}`);
}

export async function updatePost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    backWithError("/admin/blog", "Nevalidan zahtev.");
  }
  const input = readPostForm(formData);
  if (!input) {
    backWithError(`/admin/blog/${id}`, "Naslov je obavezan.");
  }

  const admin = createSupabaseAdminClient();
  // published_at se postavlja pri PRVOM objavljivanju i ne resetuje se kasnije.
  const { data: existing, error: readError } = await admin
    .from("posts")
    .select("published_at")
    .eq("id", id)
    .maybeSingle();
  if (readError || !existing) {
    backWithError("/admin/blog", "Objava nije nađena.");
  }

  const { error } = await admin
    .from("posts")
    .update({
      slug: input.slug,
      title: input.title,
      description: input.description,
      content: input.content,
      published: input.published,
      published_at: input.published
        ? ((existing.published_at as string | null) ?? new Date().toISOString())
        : (existing.published_at as string | null),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) {
    backWithError(
      `/admin/blog/${id}`,
      error.code === "23505"
        ? `Slug "${input.slug}" već postoji — izaberi drugi.`
        : `Čuvanje nije uspelo: ${error.message}`,
    );
  }

  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${id}?message=${encodeURIComponent("Objava sačuvana.")}`);
}

export async function deletePost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    backWithError("/admin/blog", "Nevalidan zahtev.");
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("posts").delete().eq("id", id);
  if (error) {
    backWithError("/admin/blog", `Brisanje nije uspelo: ${error.message}`);
  }

  revalidatePath("/admin/blog");
  redirect(`/admin/blog?message=${encodeURIComponent("Objava obrisana.")}`);
}
