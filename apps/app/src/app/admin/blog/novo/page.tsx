import { Alert, AlertDescription } from "@repo/ui";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/admin";
import { createPost } from "../actions";

export const metadata = { title: "Nova objava — Admin portal" };

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <h1 className="font-semibold text-2xl">Nova objava</h1>
      <PostEditor action={createPost} />
    </div>
  );
}
