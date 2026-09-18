import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { buildMetadata } from "@/lib/seo";
import { marketingEnv } from "@repo/config/marketing-env";

export const metadata = buildMetadata({
  title: "Upit za proizvode",
  description:
    "Pošaljite upit za Siberian Wellness proizvode — javljamo se sa cenom, dostupnošću i načinom dostave.",
  path: "/upit-za-proizvode",
});

export default function UpitZaProizvodePage() {
  const phone = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  const email = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-bold text-3xl text-ink sm:text-4xl">Upit za proizvode</h1>
      <p className="mt-3 text-muted-foreground">
        Niste sigurni šta tačno tražite? Napišite naziv proizvoda ili opišite problem koji želite da
        rešite — konsultant će vam predložiti odgovarajući proizvod i poslati cenu i uslove dostave.
      </p>

      <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
        <InquiryForm />
      </div>

      <p className="mt-6 text-center text-muted-foreground text-sm">
        Ili nas kontaktirajte direktno: {"  "}
        <a href={`mailto:${email}`} className="text-primary underline underline-offset-2">
          {email}
        </a>{" "}
        · <a href={`tel:+${phone}`}>+{phone}</a>
      </p>
    </main>
  );
}
