import { BUSINESS_PATH, FREE_TIPS_PATH, mainNav } from "@/lib/nav";
import { SITE_NAME } from "@/lib/site";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui";
import { Briefcase, ChevronDown, Leaf, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="relative block h-9 w-[203px] shrink-0 sm:h-10 sm:w-[225px]">
      <Image
        src="/logo-sibirska-priroda.png"
        alt={SITE_NAME}
        fill
        className="object-contain object-left"
        priority
        unoptimized
      />
    </Link>
  );
}

function CtaButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Link
        href={FREE_TIPS_PATH}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
      >
        <Leaf className="size-4" />
        Besplatni saveti
      </Link>
      <Link
        href={BUSINESS_PATH}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-ink/15 px-3.5 py-2 font-medium text-ink text-sm hover:border-primary hover:text-primary"
      >
        <Briefcase className="size-4" />
        Poslovna prilika
      </Link>
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="border-ink/10 border-b bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Logo />

        {/* Desktop: podmeni se otvara na hover i na fokus tastaturom (bez JS-a). */}
        <div className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-md px-2.5 py-2 text-ink/80 text-sm hover:text-primary"
                >
                  {item.label}
                  <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-56 rounded-xl border bg-popover p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-ink/80 text-sm hover:bg-accent hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-2 text-ink/80 text-sm hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <CtaButtons className="hidden xl:flex" />

        <div className="xl:hidden">
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
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Meni</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pb-6">
                <div className="mb-3 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link
                      href={FREE_TIPS_PATH}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground text-sm"
                    >
                      <Leaf className="size-4" />
                      Besplatni saveti
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href={BUSINESS_PATH}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 font-medium text-ink text-sm"
                    >
                      <Briefcase className="size-4" />
                      Poslovna prilika
                    </Link>
                  </SheetClose>
                </div>
                {mainNav.map((item) => (
                  <div key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className="block rounded-md px-2 py-2.5 font-medium text-ink text-sm hover:bg-accent"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                    {item.children ? (
                      <div className="mb-1 ml-3 flex flex-col border-ink/10 border-l pl-2">
                        {item.children.map((child) => (
                          <SheetClose key={child.href} asChild>
                            <Link
                              href={child.href}
                              className="rounded-md px-2 py-2 text-ink/70 text-sm hover:bg-accent"
                            >
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
