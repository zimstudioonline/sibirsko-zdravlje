"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

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
      className="fixed bottom-20 left-4 z-50 flex size-11 items-center justify-center rounded-full border bg-background text-ink shadow-lg transition-transform hover:scale-105 hover:text-primary lg:bottom-6"
      aria-label="Nazad na vrh"
      title="Nazad na vrh"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
