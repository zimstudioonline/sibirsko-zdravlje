import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links: Array<{ href: string; label: string }> = [
  { href: "/", label: "Početna" },
  { href: "/katalog", label: "Katalog" },
  { href: "/blog", label: "Blog" },
  { href: "/prikljuci-se", label: "Priključi se" },
  { href: "/upit-za-proizvode", label: "Upit za proizvode" },
  { href: "/kontakt", label: "Kontakt" },
  // @ludus:inject:nav:links
];

export function SiteNav() {
  return (
    <header className="border-ink/10 border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="relative h-12 w-40 shrink-0">
          <Image
            src="/logo.png"
            alt="Sibirsko Zdravlje"
            fill
            className="object-contain object-left"
            priority
            unoptimized
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 text-sm hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Otvori meni"
                className="flex size-9 items-center justify-center rounded-md border"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Meni</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pb-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-2 py-2.5 text-ink text-sm hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
