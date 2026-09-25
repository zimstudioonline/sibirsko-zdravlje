import { buildMetadata } from "@/lib/seo";
import { marketingEnv } from "@repo/config/marketing-env";
import { Button, Card, CardContent } from "@repo/ui";
import { Check, ExternalLink } from "lucide-react";

export const metadata = buildMetadata({
  title: "Poslovna prilika — Siberian Wellness",
  description:
    "Postani Privilegovani klijent Siberian Wellness-a i ostvari cashback do 15%, ili postani Konsultant i pokreni sopstveni biznis.",
  path: "/poslovna-prilika",
});

const REFERRAL = "5633043";
const PRIVILEGED_CLIENT_URL = `https://rs.siberianhealth.com/rs/shop/user/registration/PRIVILEGED_CLIENT/?referral=${REFERRAL}`;
const CONSULTANT_URL = `https://rs.siberianhealth.com/rs/shop/user/registration/CONSULTANT/?referral=${REFERRAL}`;
const SHOP_URL = `https://rs.siberianhealth.com/rs/?referral=${REFERRAL}`;

const cashbackTiers = [
  { percent: "5%", points: "30 bodova", amount: "3250 RSD" },
  { percent: "10%", points: "50 bodova", amount: "5450 RSD" },
  { percent: "15%", points: "100 bodova", amount: "10 850 RSD" },
];

export default function PoslovnaPrilikaPage() {
  const phone = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  const email = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-bold text-3xl text-ink sm:text-4xl">Poslovna prilika</h1>
      <p className="mt-4 max-w-2xl text-ink/80">
        Postani deo Siberian Wellness zajednice — kao Privilegovani klijent uz cashback na svaku
        kupovinu, ili kao Konsultant uz mogućnost izgradnje sopstvenog biznisa.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="flex h-full flex-col">
          <CardContent className="flex flex-1 flex-col gap-4 p-6">
            <h2 className="font-semibold text-ink text-xl">Privilegovani klijent</h2>
            <p className="text-ink/80 text-sm">
              Postani Privilegovani klijent Siberian Wellness-a i dobićeš cashback do 15% od svake
              kupovine.*
            </p>
            <ul className="space-y-2">
              {cashbackTiers.map((tier) => (
                <li key={tier.percent} className="flex items-start gap-3 text-ink/80 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <strong className="text-ink">{tier.percent}</strong> ukoliko je zbir kupovina u
                    tekućem mesecu {tier.points} (otprilike {tier.amount})
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-ink/50 text-xs">
              * Cashback se obračunava od cene kupovine bez PDV-a.
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-2">
              <Button asChild>
                <a href={PRIVILEGED_CLIENT_URL} target="_blank" rel="noopener noreferrer">
                  Registruj se kao Privilegovani klijent
                  <ExternalLink />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                  Poseti internet prodavnicu
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex h-full flex-col">
          <CardContent className="flex flex-1 flex-col gap-4 p-6">
            <h2 className="font-semibold text-ink text-xl">Konsultant</h2>
            <p className="text-ink/80 text-sm">
              Izgradi sopstveni online biznis kroz preporuku Siberian Wellness proizvoda — uz popust
              na sopstvenu kupovinu, proviziju od prodaje i podršku kroz edukaciju od prvog dana.
            </p>
            <p className="text-ink/80 text-sm">
              Pročitaj više o poslovnoj prilici na{" "}
              <a
                href="/blog/poslovna-prilika-siberian-wellness-kako-pokrenuti-uspesan-online-biznis-i-ostvariti-dodatnu-zaradu"
                className="text-primary hover:underline"
              >
                blogu
              </a>
              .
            </p>
            <div className="mt-auto pt-2">
              <Button asChild>
                <a href={CONSULTANT_URL} target="_blank" rel="noopener noreferrer">
                  Registruj se kao Konsultant
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 rounded-xl bg-primary px-6 py-8 text-center text-primary-foreground">
        <h2 className="font-semibold text-xl">Nisi siguran/na šta bira?</h2>
        <p className="mt-2 text-primary-foreground/80 text-sm">
          Javi nam se telefonom, Viberom ili mejlom i objasnićemo ti sledeće korake.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={`viber://chat?number=%2B${phone}`}
            className="rounded-lg bg-background px-5 py-2.5 font-medium text-ink text-sm hover:bg-background/90"
          >
            Piši na Viber
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-lg border border-primary-foreground/40 px-5 py-2.5 font-medium text-sm hover:bg-primary/90"
          >
            Pošalji e-mail
          </a>
        </div>
      </div>
    </main>
  );
}
