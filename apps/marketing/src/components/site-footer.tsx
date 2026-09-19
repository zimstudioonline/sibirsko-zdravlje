import { marketingEnv } from "@repo/config/marketing-env";
import Image from "next/image";
import Link from "next/link";

const quickLinks: Array<{ href: string; label: string }> = [
  { href: "/katalog", label: "Katalog" },
  { href: "/blog", label: "Blog" },
  { href: "/prikljuci-se", label: "Priključi se" },
  { href: "/upit-za-proizvode", label: "Upit za proizvode" },
];

export function SiteFooter() {
  const env = marketingEnv();
  const email = env.NEXT_PUBLIC_CONTACT_EMAIL;
  const viberNumber = env.NEXT_PUBLIC_VIBER_NUMBER;

  return (
    <footer className="border-ink/10 border-t bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="relative block h-12 w-40">
            <Image
              src="/logo.png"
              alt="Sibirsko Zdravlje"
              fill
              className="object-contain object-left"
              unoptimized
            />
          </Link>
          <p className="mt-4 max-w-xs text-muted-foreground text-sm">
            Katalog Siberian Wellness proizvoda — suplementi, kozmetika i biljni čajevi.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-ink text-sm">Navigacija</h3>
          <nav className="mt-3 flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground text-sm hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="font-medium text-ink text-sm">Kontakt</h3>
          <div className="mt-3 flex flex-col gap-2 text-muted-foreground text-sm">
            <Link href="/kontakt" className="hover:text-primary">
              Kontakt stranica
            </Link>
            <a href={`mailto:${email}`} className="hover:text-primary">
              {email}
            </a>
            {viberNumber ? (
              <a href={`viber://chat?number=%2B${viberNumber}`} className="hover:text-primary">
                Viber: +{viberNumber}
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-ink text-sm">Pravno</h3>
          <div className="mt-3 flex flex-col gap-2 text-muted-foreground text-sm">
            <Link href="/privatnost" className="hover:text-primary">
              Politika privatnosti
            </Link>
            <Link href="/uslovi" className="hover:text-primary">
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </div>

      <div className="border-ink/10 border-t">
        <div className="mx-auto max-w-6xl px-6 py-4 text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Sibirsko Zdravlje. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}
