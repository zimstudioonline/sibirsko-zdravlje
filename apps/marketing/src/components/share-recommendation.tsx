"use client";

import { ViberIcon } from "@/components/viber-button";
import { marketingEnv } from "@repo/config/marketing-env";
import { getConsent } from "@repo/ui/consent";
import { Mail, MessageCircle, Send } from "lucide-react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Stranice na kojima preporuka nema smisla (pravni tekstovi). */
const HIDDEN_ON = ["/privatnost", "/uslovi"];

type Channel = "email" | "whatsapp" | "viber";

/**
 * Link ka stranici koju posetilac upravo čita, sa UTM oznakama — u GA4
 * (Acquisition → Traffic acquisition, dimenzija "Session campaign") vidi se
 * koliko je poseta došlo preko preporuke, kojim kanalom i sa kog teksta.
 */
function shareUrl(pathname: string, channel: Channel): string {
  const url = new URL(pathname, marketingEnv().NEXT_PUBLIC_MARKETING_URL);
  url.searchParams.set("utm_source", channel);
  url.searchParams.set("utm_medium", "preporuka");
  url.searchParams.set(
    "utm_campaign",
    pathname === "/" ? "pocetna" : pathname.slice(1).replaceAll("/", "-"),
  );
  return url.toString();
}

function shareHref(pathname: string, channel: Channel): string {
  const text = `Mislim da bi ti ovo moglo biti korisno: ${shareUrl(pathname, channel)}`;
  switch (channel) {
    case "email":
      return `mailto:?subject=${encodeURIComponent("Preporuka: Sibirska Priroda")}&body=${encodeURIComponent(text)}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    case "viber":
      return `viber://forward?text=${encodeURIComponent(text)}`;
  }
}

/** GA4 "share" event — samo posle pristanka na kolačiće (consent gate). */
function trackShare(pathname: string, channel: Channel) {
  if (getConsent() !== "granted" || !window.gtag) return;
  window.gtag("event", "share", { method: channel, content_type: "page", item_id: pathname });
}

const buttons: { channel: Channel; label: string; className: string; icon: React.ReactNode }[] = [
  {
    channel: "email",
    label: "Pošalji mejlom",
    className: "bg-primary text-primary-foreground hover:bg-primary/90",
    icon: <Mail className="size-5" />,
  },
  {
    channel: "whatsapp",
    label: "Pošalji na WhatsApp",
    className: "bg-[#25D366] text-white hover:bg-[#25D366]/90",
    icon: <MessageCircle className="size-5" />,
  },
  {
    channel: "viber",
    label: "Pošalji na Viber",
    className: "bg-[#7360F2] text-white hover:bg-[#7360F2]/90",
    icon: <ViberIcon className="size-5" />,
  },
];

/** Sekcija "Prosledite preporuku" iznad footera, na svim javnim stranicama. */
export function ShareRecommendation() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="rounded-2xl border border-t-4 border-t-primary bg-card px-6 py-12 text-center sm:px-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-background shadow-md">
          <Send className="size-7 text-primary" />
        </div>
        <p className="mt-6 font-semibold text-primary text-sm uppercase tracking-widest">
          Prosledite preporuku
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-bold text-3xl text-ink leading-tight sm:text-4xl">
          Znate nekoga kome bi ovo moglo da zatreba?
          <span className="block text-primary">Pošaljite mu link, diskretno.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground leading-relaxed">
          Prosledite prijatelju ovu stranicu, gde na jednom mestu može da pročita sve o sibirskim
          biljkama, adaptogenima i zdravim navikama. Ne morate ništa da objašnjavate, dovoljna je
          jedna poruka.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {buttons.map((b) => (
            <a
              key={b.channel}
              href={shareHref(pathname, b.channel)}
              target={b.channel === "whatsapp" ? "_blank" : undefined}
              rel={b.channel === "whatsapp" ? "noopener noreferrer" : undefined}
              onClick={() => trackShare(pathname, b.channel)}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-sm transition-colors ${b.className}`}
            >
              {b.icon}
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
