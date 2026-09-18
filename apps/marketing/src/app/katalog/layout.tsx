import { CategoryNav } from "@/components/catalog/category-nav";
import { MobileCategorySheet } from "@/components/catalog/mobile-category-sheet";
import { InquiryProvider } from "@/components/inquiry/inquiry-context";
import { StickyInquiryPanel } from "@/components/inquiry/sticky-inquiry-panel";
import type { ReactNode } from "react";

/**
 * Okvir kataloga: kategorije + sadržaj + sticky upit forma. Stranice unutar
 * /katalog (page.tsx i [kategorija]/page.tsx) renderuju SAMO grid proizvoda,
 * bez sopstvenog okvira — isti obrazac kao dashboard layout u apps/app.
 */
export default function KatalogLayout({ children }: { children: ReactNode }) {
  return (
    <InquiryProvider>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-2xl text-ink sm:text-3xl">Katalog proizvoda</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Siberian Wellness proizvodi — pošaljite upit i konsultant vam odgovara sa cenom i
              dostupnošću.
            </p>
          </div>
          <MobileCategorySheet />
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr_300px]">
          <aside className="hidden lg:block">
            <CategoryNav />
          </aside>

          <div>{children}</div>

          <aside>
            <StickyInquiryPanel />
          </aside>
        </div>
      </div>
    </InquiryProvider>
  );
}
