import { marketingEnv } from "@repo/config/marketing-env";
import Link from "next/link";

export function SiteFooter() {
  const email = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer className="border-ink/10 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-muted-foreground text-sm sm:flex-row">
        <span>
          © {new Date().getFullYear()} {"Sibirsko Zdravlje"}
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/kontakt" className="hover:text-ink">
            Kontakt
          </Link>
          <a href={`mailto:${email}`} className="hover:text-ink">
            {email}
          </a>
          <Link href="/privatnost" className="hover:text-ink">
            Politika privatnosti
          </Link>
          <Link href="/uslovi" className="hover:text-ink">
            Uslovi korišćenja
          </Link>
        </nav>
      </div>
    </footer>
  );
}
