"use client";

import { Button } from "@repo/ui";
import type { ComponentProps } from "react";
import { useInquiry } from "./inquiry-context";

/**
 * Dugme koje popunjava sticky upit formu (desktop sidebar / mobile sheet u
 * katalog/layout.tsx) sa nazivom proizvoda — deljeno između kartice
 * proizvoda i stranice proizvoda da ne dupliramo useInquiry() poziv.
 */
export function RequestInquiryButton({
  productName,
  size = "sm",
  variant = "outline",
  className,
  children = "Pošalji upit",
}: {
  productName: string;
  className?: string;
  children?: React.ReactNode;
} & Pick<ComponentProps<typeof Button>, "size" | "variant">) {
  const { requestInquiry } = useInquiry();

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        requestInquiry(productName);
      }}
    >
      {children}
    </Button>
  );
}
