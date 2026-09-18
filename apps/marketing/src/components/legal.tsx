import type { ReactNode } from "react";

/** Zajednički okvir za pravne stranice (privatnost, uslovi). */

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-bold text-4xl text-ink">{title}</h1>
      <p className="mt-2 text-muted-foreground text-sm">Poslednja izmena: {updated}</p>
      <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
        <strong>Šablon, ne pravni savet.</strong> Popuni polja u [uglastim zagradama], prilagodi
        sadržaj svom poslovanju i daj advokatu na pregled pre objave. Obriši ovaj okvir kad završiš.
      </div>
      <div className="mt-10 space-y-10">{children}</div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-2xl text-ink">{title}</h2>
      <div className="space-y-3 text-ink/80 leading-relaxed">{children}</div>
    </section>
  );
}
