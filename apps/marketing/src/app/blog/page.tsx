import { getPublishedPosts } from "@/lib/blog";
import { Card, CardContent } from "@repo/ui";
import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Tekstovi, vodiči i novosti.",
};

// Objave stižu iz baze — ISR drži stranicu svežom bez novog deploy-a.
export const revalidate = 60;

const MONTHS = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

// Ručno umesto Intl.toLocaleDateString("sr-RS") — taj locale podrazumevano
// vraća ćirilicu (ostatak sajta je latinicom), pa hardkodujemo nazive meseci.
function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  return `${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}.`;
}

// Nema posebne kolone za naslovnu sliku u bazi (posts tabela je namerno
// minimalna) — prva slika iz markdown sadržaja služi kao slika kartice.
function coverImage(content: string): string | null {
  const match = content.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
  return match ? match[1] : null;
}

// Procena vremena čitanja iz broja reči u sadržaju (~180 reči/min) — nema
// posebnog polja za to u bazi, pa se računa iz istog markdown sadržaja.
function readingMinutes(content: string): number {
  const plain = content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[#*_>`-]/g, "");
  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-bold text-4xl text-ink">Blog</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const image = coverImage(post.content);
          return (
            <Card key={post.slug} className="flex h-full flex-col overflow-hidden py-0">
              <Link href={`/blog/${post.slug}`} className="contents">
                <div className="relative aspect-video w-full bg-muted">
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Newspaper className="size-10 text-primary/40" />
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-1 flex-col gap-2 px-5 pt-1 pb-5">
                  <p className="text-muted-foreground text-xs">
                    {formatDate(post.publishedAt)} · {readingMinutes(post.content)} min čitanja
                  </p>
                  <h2 className="line-clamp-2 font-semibold text-ink text-lg leading-snug hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-muted-foreground text-sm">{post.description}</p>
                  <span className="mt-auto flex items-center gap-1 pt-2 font-medium text-primary text-sm">
                    Pročitaj tekst <ArrowRight className="size-4" />
                  </span>
                </CardContent>
              </Link>
            </Card>
          );
        })}
        {posts.length === 0 ? (
          <p className="text-ink/50">
            Još nema tekstova — dodaj prvi u admin portalu (/admin/blog).
          </p>
        ) : null}
      </div>
    </main>
  );
}
