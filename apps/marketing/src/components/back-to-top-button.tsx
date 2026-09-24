"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  // Na strani proizvoda stoje dva naslagana dugmeta (poziv + WhatsApp,
  // ProductContactButtons) umesto jednog Viber dugmeta — strelica mora više
  // da se podigne da ih ne prekrije.
  const onProductPage = pathname.startsWith("/katalog/proizvod/");

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 z-50 flex size-11 items-center justify-center rounded-full border bg-background text-ink shadow-lg transition-transform hover:scale-105 hover:text-primary ${
        onProductPage ? "bottom-56 lg:bottom-40" : "bottom-36 lg:bottom-24"
      }`}
      aria-label="Nazad na vrh"
      title="Nazad na vrh"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
