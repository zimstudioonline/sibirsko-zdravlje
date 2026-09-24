import { ProductContactButtons } from "@/components/catalog/product-contact-buttons";
import { ProductGrid } from "@/components/catalog/product-grid";
import { RequestInquiryButton } from "@/components/inquiry/request-inquiry-button";
import { categoryBySlug, getProductBySlug, getProductsByCategory, products } from "@/lib/catalog";
import { productDescriptions } from "@/lib/product-descriptions";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@repo/ui";
import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

function formatPrice(price: number): string {
  return `${price.toLocaleString("sr-RS")} RSD`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/katalog/proizvod/${slug}`,
  });
}

export default async function ProizvodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.categorySlugs[0] ?? "")
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
  const description = productDescriptions[product.slug];

  return (
    <div>
      <ProductContactButtons productName={product.name} />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative aspect-square w-full rounded-xl border bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 40vw, 90vw"
              className="object-contain p-6"
              unoptimized
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Leaf className="size-16 text-primary/40" />
            </div>
          )}
        </div>

        <div>
          <Badge variant="secondary" className="w-fit text-xs">
            {product.brand}
          </Badge>
          <h1 className="mt-3 font-bold text-2xl text-ink sm:text-3xl">{product.name}</h1>
          <p className="mt-4 text-ink/80">{product.shortDescription}</p>

          <p className="mt-6 font-semibold text-ink text-xl">
            {product.price ? formatPrice(product.price) : "Cena na upit"}
          </p>

          <RequestInquiryButton
            productName={product.name}
            size="lg"
            variant="default"
            className="mt-4 w-full sm:w-auto"
          >
            Pošalji upit za ovaj proizvod
          </RequestInquiryButton>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.categorySlugs.map((slug) => {
              const category = categoryBySlug.get(slug);
              if (!category) return null;
              return (
                <Link
                  key={slug}
                  href={`/katalog/${slug}`}
                  className="rounded-full border px-3 py-1 text-ink/70 text-xs hover:border-primary hover:text-primary"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {description ? (
        <div className="mt-10 max-w-3xl">
          <h2 className="mb-3 font-semibold text-ink text-lg">O proizvodu</h2>
          <div
            className="text-ink/80 text-sm leading-relaxed [&_li]:mb-2 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-rendered iz sopstvenog build-time HTML-a (vidi product-descriptions.ts), nikad iz korisničkog unosa
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      ) : null}

      {relatedProducts.length > 0 ? (
        <div className="mt-14">
          <h2 className="mb-4 font-semibold text-ink text-lg">Slični proizvodi</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      ) : null}
    </div>
  );
}
