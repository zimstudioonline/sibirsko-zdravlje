import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { BookOpen, Leaf, Mail, Mountain, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Fokus na sibirsku prirodu",
    description:
      "Biljke tajge, Altaja i Dalekog istoka — poreklo, tradicija i sastav na jednom mestu.",
    icon: Mountain,
  },
  {
    title: "Tradicija i nauka zajedno",
    description: "Narodnu upotrebu povezujemo sa onim što su istraživanja zaista pokazala.",
    icon: BookOpen,
  },
  {
    title: "Bez preterivanja",
    description:
      "Ne obećavamo čudesna dejstva — pišemo jasno, odmereno i sa napomenama o bezbednosti.",
    icon: ShieldCheck,
  },
  {
    title: "Praktični saveti",
    description: "Ishrana, san, kretanje i navike koje se lako uklapaju u svakodnevicu.",
    icon: Leaf,
  },
  {
    title: "Na srpskom jeziku",
    description: "Tekstovi pisani za naše čitaoce, sa domaćim nazivima biljaka i namirnica.",
    icon: Users,
  },
  {
    title: "Besplatni vodiči",
    description: "Prijavite se i primajte kratke vodiče i nove tekstove na email.",
    icon: Mail,
  },
];

export function FeaturesSection() {
  return (
    <section id="prednosti" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-bold text-3xl text-ink">Zašto Sibirska Priroda</h2>
        <p className="mt-4 text-muted-foreground">
          Edukativni portal o sibirskim biljkama i zdravom životu — bez prodaje i bez praznih
          obećanja.
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
