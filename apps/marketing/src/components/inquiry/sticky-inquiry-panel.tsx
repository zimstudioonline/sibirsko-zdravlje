"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui";
import { useEffect, useState } from "react";
import { useInquiry } from "./inquiry-context";
import { InquiryForm } from "./inquiry-form";

/**
 * Sticky upit forma za katalog: na desktopu se prikazuje fiksirana u sidebaru,
 * na mobilnom je zamenjena trakom na dnu ekrana koja otvara formu u Sheet-u —
 * puna forma na malom ekranu ne bi stala pored grida proizvoda.
 *
 * Izabrani proizvod dolazi iz InquiryContext-a (postavlja ga klik na
 * "Pošalji upit" na kartici proizvoda) i unapred popunjava polje za proizvod.
 */
export function StickyInquiryPanel() {
  const { selectedProduct } = useInquiry();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (selectedProduct) setMobileOpen(true);
  }, [selectedProduct]);

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-6 rounded-xl border bg-card p-5 shadow-sm">
          <InquiryForm key={selectedProduct} defaultProduct={selectedProduct} />
        </div>
      </div>

      {/* Mobile: sticky traka na dnu + Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur">
            <SheetTrigger asChild>
              <button
                type="button"
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground text-sm hover:bg-primary/90"
              >
                Pošalji upit za proizvod
              </button>
            </SheetTrigger>
          </div>
          <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Upit za proizvode</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <InquiryForm key={selectedProduct} defaultProduct={selectedProduct} compact />
            </div>
          </SheetContent>
        </Sheet>
        {/* Razmak na dnu stranice da sticky traka ne prekriva poslednji red proizvoda. */}
        <div className="h-16" aria-hidden="true" />
      </div>
    </>
  );
}
