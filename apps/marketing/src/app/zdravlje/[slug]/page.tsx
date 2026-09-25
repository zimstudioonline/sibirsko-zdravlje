import { TopicArticle } from "@/components/content/topic-article";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH, getZdravljeTema, zdravljeTeme } from "@/lib/content/zdravlje";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return zdravljeTeme.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getZdravljeTema(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `${ZDRAVLJE_PATH}/${page.slug}`,
  });
}

export default async function ZdravljeTemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getZdravljeTema(slug);
  if (!page) notFound();

  const related = [
    ...zdravljeTeme
      .filter((item) => item.slug !== page.slug)
      .map((item) => ({ href: `${ZDRAVLJE_PATH}/${item.slug}`, label: item.label })),
    { href: ADAPTOGENI_PATH, label: "Adaptogeni" },
    { href: BILJKE_PATH, label: "Sibirske biljke" },
  ];

  return (
    <TopicArticle
      page={page}
      currentPath={`${ZDRAVLJE_PATH}/${page.slug}`}
      breadcrumbs={[
        { href: "/", label: "Početna" },
        { href: ZDRAVLJE_PATH, label: "Zdravlje" },
      ]}
      related={related}
    />
  );
}
