import { ConsultantSiteNotice } from "@/components/consultant-site-notice";
import { FreeTipsCta } from "@/components/content/free-tips-cta";
import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH } from "@/lib/content/zdravlje";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS_SITE_LABEL, PRODUCTS_SITE_URL, SITE_NAME } from "@/lib/site";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "O nama",
  description:
    "SibirskaPriroda.com je edukativni portal o biljkama sibirske tajge, adaptogenima i zdravom načinu života. Ko stoji iza portala i kako nastaje sadržaj.",
  path: "/o-nama",
});

export default function ONamaPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="font-bold text-3xl text-ink sm:text-4xl">O nama</h1>
      <p className="mt-6 text-ink/85 text-lg leading-relaxed">
        {SITE_NAME} je edukativni portal posvećen biljkama sibirske tajge, adaptogenima, prirodnim
        sastojcima i zdravom načinu života. Želimo da na jednom mestu, jasno i na srpskom jeziku,
        objasnimo odakle potiču sibirske biljke, šta o njima kaže tradicija, a šta nauka.
      </p>

      <section className="mt-10">
        <h2 className="font-semibold text-2xl text-ink">Šta ćete naći na portalu</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/85 leading-relaxed">
          <li>
            <Link href={BILJKE_PATH} className="text-primary underline underline-offset-2">
              Sibirske biljke
            </Link>{" "}
            — šisandra, eleuterokok, rodiola, čaga, aralija i druge biljke tajge i Altaja.
          </li>
          <li>
            <Link href={ADAPTOGENI_PATH} className="text-primary underline underline-offset-2">
              Adaptogeni
            </Link>{" "}
            — šta taj pojam zaista znači i odakle potiče.
          </li>
          <li>
            <Link href={ZDRAVLJE_PATH} className="text-primary underline underline-offset-2">
              Zdravlje
            </Link>{" "}
            — praktični tekstovi o imunitetu, energiji, ishrani i zdravim navikama.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-semibold text-2xl text-ink">Kako pišemo</h2>
        <p className="mt-4 text-ink/85 leading-relaxed">
          Trudimo se da tekstovi budu tačni, razumljivi i bez preterivanja. Ne obećavamo čudesna
          dejstva i ne pripisujemo biljkama lekovita svojstva koja nisu potvrđena. Sadržaj je
          informativnog karaktera i ne zamenjuje savet lekara ili farmaceuta.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-semibold text-2xl text-ink">Ko stoji iza portala</h2>
        <p className="mt-4 text-ink/85 leading-relaxed">
          Portal vodi nezavisni konsultant kompanije Siberian Wellness. Želimo da budemo
          transparentni: ako vas zanimaju proizvodi, pogledajte ih na sajtu{" "}
          <a href={PRODUCTS_SITE_URL} className="text-primary underline underline-offset-2">
            {PRODUCTS_SITE_LABEL}
          </a>
          . Na ovom portalu proizvode ne prodajemo.
        </p>
        <div className="mt-6">
          <ConsultantSiteNotice />
        </div>
      </section>

      <FreeTipsCta className="mt-12" />
    </main>
  );
}
