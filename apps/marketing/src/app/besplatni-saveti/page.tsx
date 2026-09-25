import { SavetiForm } from "@/components/leads/saveti-form";
import { FREE_TIPS_PATH } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { Card, CardContent } from "@repo/ui";
import { BookOpen, Check, Leaf, Mail } from "lucide-react";

export const metadata = buildMetadata({
  title: "Besplatni saveti o zdravlju, energiji i prirodnim sastojcima",
  description:
    "Ostavite email i primajte besplatne savete i vodiče o sibirskim biljkama, adaptogenima, energiji i zdravim navikama.",
  path: FREE_TIPS_PATH,
});

const benefits = [
  "Kratki vodiči o sibirskim biljkama i adaptogenima",
  "Praktični saveti za energiju, san i svakodnevni ritam",
  "Novi tekstovi sa portala — među prvima",
  "Bez spama i bez obaveze, odjava u svakom trenutku",
];

export default function BesplatniSavetiPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
      <div className="grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
            <Leaf className="size-4" />
            Besplatni saveti
          </p>
          <h1 className="mt-5 font-bold text-3xl text-ink leading-tight sm:text-4xl">
            Želite korisne informacije o zdravlju, energiji i prirodnim sastojcima?
          </h1>
          <p className="mt-5 text-ink/85 text-lg leading-relaxed">
            Ostavite email i primajte korisne savete i vodiče — jasno, kratko i bez preterivanja.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-ink/85">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Prijavite se besplatno</p>
                <p className="text-muted-foreground text-sm">Potrebni su samo ime i email.</p>
              </div>
            </div>
            <SavetiForm />
          </CardContent>
        </Card>
      </div>

      <section className="mt-16 rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <BookOpen className="mt-1 size-6 shrink-0 text-primary" />
          <div>
            <h2 className="font-semibold text-ink text-xl">Šta šaljemo?</h2>
            <p className="mt-2 text-ink/80 leading-relaxed">
              Edukativne tekstove o biljkama sibirske tajge, adaptogenima, ishrani i zdravim
              navikama. Sadržaj je informativnog karaktera i ne zamenjuje savet lekara. Vaše podatke
              koristimo isključivo za slanje saveta i ne delimo ih sa trećim licima.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
