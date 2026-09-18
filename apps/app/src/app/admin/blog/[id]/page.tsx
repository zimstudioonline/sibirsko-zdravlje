import { createSupabaseAdminClient } from "@repo/auth/server";
import { Alert, AlertDescription } from "@repo/ui";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/admin";
import { updatePost } from "../actions";

export const metadata = { title: "Izmena objave — Admin portal" };

interface PostRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
}

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { id } = await params;
  const { error, message } = await searchParams;
  await requireAdmin();

  const admin = createSupabaseAdminClient();
  const result = await admin
    .from("posts")
    .select("id, slug, title, description, content, published")
    .eq("id", id)
    .maybeSingle();
  if (result.error) {
    throw new Error(`Čitanje objave nije uspelo: ${result.error.message}`);
  }
  if (!result.data) {
    notFound();
  }
  const post = result.data as PostRow;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      {message ? (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      <h1 className="font-semibold text-2xl">Izmena objave</h1>
      <PostEditor action={updatePost} post={post} />
    </div>
  );
}
