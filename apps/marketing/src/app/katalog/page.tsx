import { ProductGrid } from "@/components/catalog/product-grid";
import { products } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Katalog",
  description: "Kompletan katalog Siberian Wellness proizvoda — suplementi, kozmetika i čajevi.",
  path: "/katalog",
});

export default function KatalogPage() {
  return <ProductGrid products={products} />;
}
