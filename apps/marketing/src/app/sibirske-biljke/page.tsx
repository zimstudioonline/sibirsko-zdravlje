import { FreeTipsCta } from "@/components/content/free-tips-cta";
import { TopicCards } from "@/components/content/topic-cards";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH, biljke } from "@/lib/content/biljke";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Sibirske biljke — šisandra, eleuterokok, rodiola, čaga i aralija",
  description:
    "Biljke sibirske tajge, Altaja i Dalekog istoka: poreklo, narodna tradicija, sastav i na šta obratiti pažnju. Šisandra, eleuterokok, rodiola, čaga, aralija.",
  path: BILJKE_PATH,
});

export default function SibirskeBiljkePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <p className="font-medium text-primary text-sm">Sibirska priroda</p>
      <h1 className="mt-2 font-bold text-3xl text-ink sm:text-4xl">Sibirske biljke</h1>
      <p className="mt-5 max-w-3xl text-ink/85 text-lg leading-relaxed">
        Tajga, planine Altaja i šume Dalekog istoka dom su biljaka koje su vekovima bile deo narodne
        tradicije, a u 20. veku postale predmet ozbiljnih naučnih istraživanja. Upoznajte ih —
        odakle potiču, šta sadrže i na šta treba obratiti pažnju.
      </p>

      <div className="mt-10">
        <TopicCards items={biljke} basePath={BILJKE_PATH} />
      </div>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-semibold text-2xl text-ink">Zašto baš Sibir?</h2>
          <p className="mt-4 text-ink/85 leading-relaxed">
            Duge zime sa temperaturama i do −50 °C i kratka, intenzivna leta stvaraju uslove u
            kojima opstaju samo izdržljive vrste. Mnoge sibirske biljke bogate su zaštitnim
            materijama, što je sredinom 20. veka privuklo pažnju istraživača iz Vladivostoka i
            Tomska.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-2xl text-ink">Veza sa adaptogenima</h2>
          <p className="mt-4 text-ink/85 leading-relaxed">
            Eleuterokok, rodiola, šisandra i aralija su „klasični“ adaptogeni — biljke na kojima je
            nastao sam pojam.{" "}
            <Link href={ADAPTOGENI_PATH} className="text-primary underline underline-offset-2">
              Pročitajte šta su adaptogeni
            </Link>{" "}
            i šta o njima zaista znamo.
          </p>
        </div>
      </section>

      <FreeTipsCta className="mt-16" />
    </main>
  );
}
