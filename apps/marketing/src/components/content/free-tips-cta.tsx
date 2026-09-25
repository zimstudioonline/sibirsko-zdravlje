import { FREE_TIPS_PATH } from "@/lib/nav";
import { Leaf } from "lucide-react";
import Link from "next/link";

/** Funnel blok: vodi posetioca na prijavu za besplatne savete. */
export function FreeTipsCta({ className = "" }: { className?: string }) {
  return (
    <section
      className={`rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground ${className}`}
    >
      <Leaf className="mx-auto size-8 text-primary-foreground/80" />
      <h2 className="mt-3 font-bold text-2xl sm:text-3xl">
        Želite korisne savete o zdravlju i prirodi?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
        Ostavite email i primajte kratke vodiče o sibirskim biljkama, energiji i zdravim navikama.
        Besplatno, bez obaveze.
      </p>
      <Link
        href={FREE_TIPS_PATH}
        className="mt-7 inline-block rounded-lg bg-background px-6 py-3 font-medium text-ink hover:bg-background/90"
      >
        Želim besplatne savete
      </Link>
    </section>
  );
}
