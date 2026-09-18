"use client";

import { useInquiry } from "@/components/inquiry/inquiry-context";
import type { Product } from "@/lib/catalog";
import { Badge, Button, Card, CardContent } from "@repo/ui";
import { Leaf } from "lucide-react";
import Image from "next/image";

function formatPrice(price: number): string {
  return `${price.toLocaleString("sr-RS")} RSD`;
}

export function ProductCard({ product }: { product: Product }) {
  const { requestInquiry } = useInquiry();

  return (
    <Card className="flex h-full flex-col overflow-hidden py-0">
      <div className="relative aspect-square w-full bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Leaf className="size-10 text-primary/40" />
          </div>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 px-4 pt-1 pb-4">
        <Badge variant="secondary" className="w-fit text-[11px]">
          {product.brand}
        </Badge>
        <h3 className="font-medium text-ink text-sm leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-muted-foreground text-xs">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold text-ink text-sm">
            {product.price ? formatPrice(product.price) : "Cena na upit"}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => requestInquiry(product.name)}
          >
            Pošalji upit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
