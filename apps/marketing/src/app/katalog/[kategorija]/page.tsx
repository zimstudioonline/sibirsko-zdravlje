import { ProductGrid } from "@/components/catalog/product-grid";
import { categories, categoryBySlug, getProductsByCategory } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categories.map((category) => ({ kategorija: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorija: string }>;
}) {
  const { kategorija } = await params;
  const category = categoryBySlug.get(kategorija);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: `${category.name} — Siberian Wellness proizvodi. Pošaljite upit za cenu i dostupnost.`,
    path: `/katalog/${kategorija}`,
  });
}

export default async function KategorijaPage({
  params,
}: {
  params: Promise<{ kategorija: string }>;
}) {
  const { kategorija } = await params;
  const category = categoryBySlug.get(kategorija);
  if (!category) notFound();

  const products = getProductsByCategory(kategorija);

  return (
    <div>
      <h2 className="mb-4 font-semibold text-ink text-lg lg:hidden">{category.name}</h2>
      <ProductGrid products={products} />
    </div>
  );
}
