import { categories, categoryGroups } from "@/lib/catalog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn } from "@repo/ui";
import Link from "next/link";

/**
 * Sadržaj navigacije kroz kategorije — bez sopstvenog okvira, da bi mogao da
 * se koristi i u desktop sidebaru (category-sidebar.tsx) i u mobilnom Sheet-u.
 */
export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const topLevel = categories.filter((category) => !category.group);

  return (
    <nav className="space-y-4">
      <Link
        href="/katalog"
        className={cn(
          "block rounded-md px-2 py-1.5 font-medium text-sm",
          !activeSlug ? "bg-primary/10 text-primary" : "text-ink hover:bg-accent",
        )}
      >
        Svi proizvodi
      </Link>

      <Accordion type="multiple" defaultValue={["Namena", "Brendovi BAD"]}>
        {categoryGroups.map((group) => (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-2 text-sm">{group.label}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {categories
                  .filter((category) => category.group === group.id)
                  .map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/katalog/${category.slug}`}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm",
                          activeSlug === category.slug
                            ? "bg-primary/10 text-primary"
                            : "text-ink/80 hover:bg-accent",
                        )}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ul className="space-y-0.5 border-t pt-3">
        {topLevel.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/katalog/${category.slug}`}
              className={cn(
                "block rounded-md px-2 py-1.5 text-sm",
                activeSlug === category.slug
                  ? "bg-primary/10 text-primary"
                  : "text-ink/80 hover:bg-accent",
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
