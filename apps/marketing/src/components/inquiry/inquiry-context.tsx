"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

/**
 * Deli izabrani proizvod između kartica u katalogu i sticky upit forme —
 * klik na "Pošalji upit" na kartici popunjava polje u formi (desktop sidebar
 * ili mobile sheet, zavisno od CatalogShell-a koji renderuje formu).
 */

interface InquiryContextValue {
  selectedProduct?: string;
  requestInquiry: (productName: string) => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  return (
    <InquiryContext.Provider value={{ selectedProduct, requestInquiry: setSelectedProduct }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry(): InquiryContextValue {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry mora biti unutar <InquiryProvider>.");
  return ctx;
}
