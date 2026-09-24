"use client";

import { marketingEnv } from "@repo/config/marketing-env";
import { useState } from "react";

/**
 * Isto plutajuće Viber dugme kao ViberButton (koje se sakriva na ovoj ruti).
 *
 * Viber `viber://chat` nema zvaničan parametar za unapred popunjenu poruku
 * (potvrđeno testiranjem na telefonu — `text=` ne radi kao kod WhatsAppa).
 * Zato dugme prvo kopira poruku u clipboard, pa tek onda otvori Viber
 * razgovor — korisnik je nalepi (duži pritisak → Nalepi).
 */
export function ProductViberButton({ productName }: { productName: string }) {
  const number = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  const [copied, setCopied] = useState(false);

  if (!number) return null;

  const message = `Zdravo, želim da poručim: ${productName}`;
  const href = `viber://chat?number=%2B${number}`;

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch {
      // Clipboard API nedostupna (npr. bez HTTPS/dozvole) — Viber se ipak otvara.
    }
  }

  return (
    <div className="fixed right-4 bottom-20 z-50 lg:bottom-6">
      {copied ? (
        <div className="-top-14 absolute right-0 w-max max-w-56 rounded-lg bg-ink px-3 py-2 text-background text-xs shadow-lg">
          Poruka je kopirana — nalepite je u Viber razgovoru
        </div>
      ) : null}
      <a
        href={href}
        onClick={handleClick}
        className="flex size-14 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Poruči preko Vibera"
        title="Poruči preko Vibera"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
          <path d="M12.03 2c-2.66 0-5.15.86-7.02 2.6C3.1 6.36 2.06 8.9 2.02 11.63c-.03 2.13.56 4.02 1.7 5.68l.2.28-.7 2.58a.75.75 0 0 0 .93.92l2.5-.7.27.16c1.5.85 3.2 1.3 4.94 1.3h.02c2.65 0 5.14-.86 7.01-2.6 1.9-1.76 2.95-4.3 2.98-7.03.04-2.75-1.03-5.36-3-7.36C16.98 2.98 14.6 2 12.03 2Zm4.6 13.05c-.2.55-1.12 1.08-1.55 1.13-.4.05-.9.07-1.46-.1-.34-.1-.77-.24-1.33-.48-2.35-1.02-3.9-3.4-4.02-3.56-.12-.16-.96-1.28-.96-2.44s.6-1.73.83-1.97c.22-.24.48-.3.64-.3l.46.01c.15 0 .35-.02.55.42l.7 1.7c.08.19.14.4.03.62-.11.22-.17.36-.33.55-.16.19-.34.42-.49.57-.16.15-.33.32-.15.63.19.31.83 1.37 1.79 2.22 1.23 1.1 2.26 1.44 2.57 1.6.31.16.5.14.68-.05.19-.19.79-.92.99-1.24.2-.31.4-.26.68-.16.28.1 1.76.83 2.06.98.31.16.51.24.58.37.08.13.08.72-.12 1.28Z" />
        </svg>
        <span className="sr-only">Poruči preko Vibera</span>
      </a>
    </div>
  );
}
