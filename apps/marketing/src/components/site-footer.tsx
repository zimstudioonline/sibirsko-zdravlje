import { getPublishedPosts } from "@/lib/blog";
import { marketingEnv } from "@repo/config/marketing-env";
import Image from "next/image";
import Link from "next/link";

const usefulLinks: Array<{ href: string; label: string }> = [
  { href: "/katalog", label: "Katalog" },
  { href: "/blog", label: "Blog" },
  { href: "/prikljuci-se", label: "Priključi se" },
  { href: "/upit-za-proizvode", label: "Upit za proizvode" },
  { href: "/privatnost", label: "Politika privatnosti" },
  { href: "/uslovi", label: "Uslovi korišćenja" },
];

export async function SiteFooter() {
  const env = marketingEnv();
  const email = env.NEXT_PUBLIC_CONTACT_EMAIL;
  const viberNumber = env.NEXT_PUBLIC_VIBER_NUMBER;
  // Blog radi i bez Supabase ključeva (vraća prazan niz) — kolona se u tom
  // slučaju jednostavno ne prikazuje, isti graceful-fallback obrazac kao
  // ostatak bloga.
  const recentPosts = (await getPublishedPosts()).slice(0, 4);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            {/* logo.png ima utisnut plavi wordmark koji se gubi na tamnoj
                pozadini — isečemo samo ikonicu (gornji deo slike) i dodamo
                pravi HTML tekst pored, koji ostaje čitljiv bez obzira na boju. */}
            <span
              className="relative block h-11 shrink-0 overflow-hidden"
              style={{ aspectRatio: "512 / 360" }}
            >
              <Image src="/logo.png" alt="" fill className="object-cover object-top" unoptimized />
            </span>
            <span className="font-semibold text-base tracking-tight">Sibirsko Zdravlje</span>
          </Link>
          <p className="mt-4 max-w-xs text-primary-foreground/75 text-sm">
            Katalog Siberian Wellness proizvoda — suplementi, kozmetika i biljni čajevi.
          </p>
        </div>

        {recentPosts.length > 0 ? (
          <div>
            <h3 className="font-medium text-sm">Poslednji postovi</h3>
            <nav className="mt-3 flex flex-col gap-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="text-primary-foreground/75 text-sm hover:text-primary-foreground"
                >
                  {post.title}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        <div>
          <h3 className="font-medium text-sm">Kontakt</h3>
          <div className="mt-3 flex flex-col gap-2 text-primary-foreground/75 text-sm">
            <Link href="/kontakt" className="hover:text-primary-foreground">
              Kontakt stranica
            </Link>
            <a href={`mailto:${email}`} className="hover:text-primary-foreground">
              {email}
            </a>
            {viberNumber ? (
              <a
                href={`viber://chat?number=%2B${viberNumber}`}
                className="hover:text-primary-foreground"
              >
                Viber: +{viberNumber}
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm">Korisni linkovi</h3>
          <nav className="mt-3 flex flex-col gap-2">
            {usefulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-foreground/75 text-sm hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-primary-foreground/15 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-4 text-primary-foreground/60 text-xs sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Sibirsko Zdravlje. Sva prava zadržana.</span>
          <span>
            Design &amp; SEO by{" "}
            <a
              href="https://zimdigital.rs/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground"
            >
              ZiM Digital
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
