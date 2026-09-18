import { getPublishedPosts } from "@/lib/blog";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Tekstovi, vodiči i novosti.",
};

// Objave stižu iz baze — ISR drži stranicu svežom bez novog deploy-a.
export const revalidate = 60;

function formatDate(value: string | null): string {
  return value ? new Date(value).toLocaleDateString("sr-RS") : "";
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-bold text-4xl text-ink">Blog</h1>
      <div className="mt-10 space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <p className="text-muted-foreground text-sm">{formatDate(post.publishedAt)}</p>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {posts.length === 0 ? (
          <p className="text-ink/50">
            Još nema tekstova — dodaj prvi u admin portalu (/admin/blog).
          </p>
        ) : null}
      </div>
    </main>
  );
}
