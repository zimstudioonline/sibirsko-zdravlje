import { TopicArticle } from "@/components/content/topic-article";
import { ADAPTOGENI_PATH, adaptogeni } from "@/lib/content/adaptogeni";
import { BILJKE_PATH } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH } from "@/lib/content/zdravlje";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: adaptogeni.title,
  description: adaptogeni.description,
  path: ADAPTOGENI_PATH,
});

export default function AdaptogeniPage() {
  return (
    <TopicArticle
      page={adaptogeni}
      currentPath={ADAPTOGENI_PATH}
      breadcrumbs={[{ href: "/", label: "Početna" }]}
      related={[
        { href: `${BILJKE_PATH}/eleuterokok`, label: "Eleuterokok" },
        { href: `${BILJKE_PATH}/rodiola`, label: "Rodiola" },
        { href: `${BILJKE_PATH}/sisandra`, label: "Šisandra" },
        { href: `${BILJKE_PATH}/aralija`, label: "Aralija" },
        { href: `${BILJKE_PATH}/ostale-sibirske-biljke`, label: "Levzeja i druge biljke" },
        { href: `${ZDRAVLJE_PATH}/energija-i-vitalnost`, label: "Energija i vitalnost" },
      ]}
    />
  );
}
