import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { BadgeCheck, Leaf, MessageCircle, ShieldCheck, Truck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Originalni Siberian Wellness proizvodi",
    description: "Svaki proizvod nabavljamo isključivo preko zvanične distribucije kompanije.",
    icon: BadgeCheck,
  },
  {
    title: "Prirodan sastav",
    description: "Suplementi, kozmetika i čajevi na bazi sibirskog bilja i proverenih sastojaka.",
    icon: Leaf,
  },
  {
    title: "Odgovor bez obaveze",
    description: "Pošaljete upit, konsultant vam odgovori sa cenom — kupovina nije obavezna.",
    icon: MessageCircle,
  },
  {
    title: "Lična podrška konsultanta",
    description: "Pomažemo vam da izaberete pravi proizvod za vaše potrebe.",
    icon: Users,
  },
  {
    title: "Dostava na kućnu adresu",
    description: "Naručene proizvode šaljemo na adresu širom Srbije.",
    icon: Truck,
  },
  {
    title: "Bezbedno poručivanje",
    description: "Vaši podaci iz upita se koriste isključivo za kontakt povodom porudžbine.",
    icon: ShieldCheck,
  },
];

export function FeaturesSection() {
  return (
    <section id="prednosti" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-bold text-3xl text-ink">Zašto Sibirsko Zdravlje</h2>
        <p className="mt-4 text-muted-foreground">
          Proveren asortiman i lična podrška na svakom koraku, od izbora do dostave.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
