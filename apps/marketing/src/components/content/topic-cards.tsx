import type { TopicPage } from "@/lib/content/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Kartice za hub stranice i početnu (biljke, zdravlje). */
export function TopicCards({ items, basePath }: { items: TopicPage[]; basePath: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${basePath}/${item.slug}`}
          className="group flex flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary"
        >
          <h3 className="font-semibold text-ink text-lg group-hover:text-primary">{item.label}</h3>
          {item.latinName ? (
            <p className="mt-0.5 text-muted-foreground text-sm italic">{item.latinName}</p>
          ) : null}
          <p className="mt-3 flex-1 text-ink/75 text-sm">{item.teaser}</p>
          <span className="mt-4 inline-flex items-center gap-1 font-medium text-primary text-sm">
            Pročitaj više
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
