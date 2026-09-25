import { FreeTipsCta } from "@/components/content/free-tips-cta";
import { TopicCards } from "@/components/content/topic-cards";
import { ZDRAVLJE_PATH, zdravljeTeme } from "@/lib/content/zdravlje";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Zdravlje — imunitet, energija, ishrana i zdrav životni stil",
  description:
    "Praktični tekstovi o imunitetu, energiji i vitalnosti, ishrani, wellness navikama i zdravom životnom stilu — jasno i bez preterivanja.",
  path: ZDRAVLJE_PATH,
});

export default function ZdravljePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <p className="font-medium text-primary text-sm">Zdrav život</p>
      <h1 className="mt-2 font-bold text-3xl text-ink sm:text-4xl">Zdravlje</h1>
      <p className="mt-5 max-w-3xl text-ink/85 text-lg leading-relaxed">
        Zdravlje se gradi svakodnevno — kroz san, ishranu, kretanje i brigu o sebi. U ovom odeljku
        donosimo jasne, praktične tekstove bez preterivanja i obećanja o čudesnim rešenjima.
      </p>

      <div className="mt-10">
        <TopicCards items={zdravljeTeme} basePath={ZDRAVLJE_PATH} />
      </div>

      <FreeTipsCta className="mt-16" />
    </main>
  );
}
