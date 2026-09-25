import { KontaktForm } from "@/components/contact/kontakt-form";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS_SITE_LABEL, PRODUCTS_SITE_URL } from "@/lib/site";
import { marketingEnv } from "@repo/config/marketing-env";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "Kontakt",
  description:
    "Kontaktirajte nas telefonom, e-mailom ili preko Vibera — za pitanja o sadržaju portala, saradnji i poslovnoj prilici.",
  path: "/kontakt",
});

export default function KontaktPage() {
  const phone = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  const email = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="font-bold text-3xl text-ink sm:text-4xl">Kontakt</h1>
      <p className="mt-3 text-muted-foreground">
        Tu smo za pitanja o sadržaju portala, saradnji i poslovnoj prilici.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <a
          href={`tel:+${phone}`}
          className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 hover:border-primary"
        >
          <Phone className="size-6 text-primary" />
          <span className="font-medium text-ink text-sm">Telefon</span>
          <span className="text-muted-foreground text-sm">+{phone}</span>
        </a>
        <a
          href={`viber://chat?number=%2B${phone}`}
          className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 hover:border-primary"
        >
          <MessageCircle className="size-6 text-primary" />
          <span className="font-medium text-ink text-sm">Viber</span>
          <span className="text-muted-foreground text-sm">+{phone}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="flex flex-col items-center gap-2 rounded-xl border bg-card p-6 hover:border-primary"
        >
          <Mail className="size-6 text-primary" />
          <span className="font-medium text-ink text-sm">E-mail</span>
          <span className="break-all text-muted-foreground text-sm">{email}</span>
        </a>
      </div>

      <p className="mt-10 text-muted-foreground text-sm">
        Pitanje o konkretnom proizvodu?{" "}
        <a
          href={`${PRODUCTS_SITE_URL}/upit-za-proizvode/`}
          className="text-primary underline underline-offset-2"
        >
          Pošaljite upit na {PRODUCTS_SITE_LABEL}
        </a>
        .
      </p>

      <div className="mt-10 rounded-xl border bg-card p-6 text-left sm:p-8">
        <h2 className="font-semibold text-ink text-xl">Pošaljite nam poruku</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Za sva ostala pitanja — javićemo vam se e-mailom.
        </p>
        <div className="mt-6">
          <KontaktForm />
        </div>
      </div>
    </main>
  );
}
