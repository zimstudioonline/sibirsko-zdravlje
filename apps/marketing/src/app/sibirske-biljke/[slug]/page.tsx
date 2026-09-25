import { TopicArticle } from "@/components/content/topic-article";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH, biljke, getBiljka } from "@/lib/content/biljke";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return biljke.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBiljka(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `${BILJKE_PATH}/${page.slug}`,
  });
}

export default async function BiljkaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getBiljka(slug);
  if (!page) notFound();

  const related = [
    ...biljke
      .filter((item) => item.slug !== page.slug)
      .map((item) => ({ href: `${BILJKE_PATH}/${item.slug}`, label: item.label })),
    { href: ADAPTOGENI_PATH, label: "Šta su adaptogeni?" },
  ];

  return (
    <TopicArticle
      page={page}
      currentPath={`${BILJKE_PATH}/${page.slug}`}
      breadcrumbs={[
        { href: "/", label: "Početna" },
        { href: BILJKE_PATH, label: "Sibirske biljke" },
      ]}
      related={related}
      relatedTitle="Još sibirskih biljaka"
    />
  );
}
