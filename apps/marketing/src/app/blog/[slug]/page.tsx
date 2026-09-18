import { getPost } from "@/lib/blog";
import { marketingEnv } from "@repo/config/marketing-env";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../blog.css";

// Objave stižu iz baze — ISR drži stranicu svežom bez novog deploy-a.
export const revalidate = 60;

function postUrl(slug: string): string {
  return `${marketingEnv().NEXT_PUBLIC_MARKETING_URL}/blog/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }

  const url = postUrl(post.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url,
      siteName: "Sibirsko Zdravlje",
      type: "article",
      locale: "sr_RS",
      publishedTime: post.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  // Article schema za pretraživače i AI asistente. Namerno inline (bez importa
  // iz seo-aeo modula) — blog mora da radi i kad taj modul nije izabran.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    url: postUrl(post.slug),
    publisher: { "@type": "Organization", name: "Sibirsko Zdravlje" },
  };
  // Escape "<" sprečava </script> breakout iz sadržaja objave.
  const articleLdJson = JSON.stringify(articleLd).replace(/</g, "\\u003c");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify + escape, bez sirovog HTML-a
        dangerouslySetInnerHTML={{ __html: articleLdJson }}
      />
      {post.publishedAt ? (
        <p className="text-ink/40 text-sm">
          {new Date(post.publishedAt).toLocaleDateString("sr-RS")}
        </p>
      ) : null}
      <h1 className="mt-2 font-bold text-4xl text-ink">{post.title}</h1>
      <article className="blog-article mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
