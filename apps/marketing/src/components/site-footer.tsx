import { getPublishedPosts } from "@/lib/blog";
import { BUSINESS_PATH, FREE_TIPS_PATH, mainNav } from "@/lib/nav";
import { PRODUCTS_SITE_LABEL, PRODUCTS_SITE_URL, SITE_NAME } from "@/lib/site";
import { marketingEnv } from "@repo/config/marketing-env";
import Image from "next/image";
import Link from "next/link";

const usefulLinks: Array<{ href: string; label: string }> = [
  ...mainNav.filter((item) => item.href !== "/"),
  { href: FREE_TIPS_PATH, label: "Besplatni saveti" },
  { href: BUSINESS_PATH, label: "Poslovna prilika" },
  { href: "/kontakt", label: "Kontakt" },
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
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="relative block h-9 w-[203px]">
            {/* Varijanta logotipa sa belim tekstom — čitljiva na tamnoj pozadini. */}
            <Image
              src="/logo-sibirska-priroda-white.png"
              alt={SITE_NAME}
              fill
              className="object-contain object-left"
              unoptimized
            />
          </Link>
          <p className="mt-4 max-w-xs text-paper/70 text-sm">
            Edukativni portal o biljkama sibirske tajge, adaptogenima i zdravom načinu života.
          </p>
          <p className="mt-4 text-paper/70 text-sm">
            Tražite proizvode?{" "}
            <a
              href={PRODUCTS_SITE_URL}
              className="font-medium text-paper underline underline-offset-2 hover:text-paper/80"
            >
              {PRODUCTS_SITE_LABEL}
            </a>
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
                  className="text-paper/70 text-sm hover:text-paper"
                >
                  {post.title}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        <div>
          <h3 className="font-medium text-sm">Kontakt</h3>
          <div className="mt-3 flex flex-col gap-2 text-paper/70 text-sm">
            <Link href="/kontakt" className="hover:text-paper">
              Kontakt stranica
            </Link>
            <a href={`mailto:${email}`} className="hover:text-paper">
              {email}
            </a>
            {viberNumber ? (
              <a href={`viber://chat?number=%2B${viberNumber}`} className="hover:text-paper">
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
                className="text-paper/70 text-sm hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-paper/15 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-4 text-paper/60 text-xs sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. Sva prava zadržana.
          </span>
          <span>
            Design &amp; SEO by{" "}
            <a
              href="https://zimdigital.rs/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              ZiM Digital
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
