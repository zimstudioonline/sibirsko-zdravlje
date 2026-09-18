/**
 * Pretplatni planovi — jedan izvor istine za pricing UI na billing stranici.
 *
 * Ovde menjaš nazive, cene za PRIKAZ i liste pogodnosti. Stvarni iznos
 * naplate određuje payment provajder kroz product/price ID po planu i
 * intervalu (vrednosti u .env) — kad menjaš cenu kod provajdera, uskladi
 * i prikaz ovde.
 */

export type PlanKey = "starter" | "pro";
export type BillingInterval = "monthly" | "yearly";

export interface Plan {
  key: PlanKey;
  /** Naziv plana na kartici. */
  name: string;
  /** Oznaka iznad naziva, npr. "Popularni paket". */
  badge: string;
  /** Cena za prikaz po intervalu — naplatu određuje provajder. */
  price: Record<BillingInterval, string>;
  /** Simbol valute uz cenu. */
  currency: string;
  /** Napomena ispod cene (okvirna cena u RSD, način plaćanja...). */
  note: string;
  /** Pogodnosti plana — jedna stavka po redu. */
  features: string[];
  /** Istaknuta (tamna) kartica sa naglašenim dugmetom. */
  highlighted: boolean;
}

export const PLANS: readonly Plan[] = [
  {
    key: "starter",
    name: "Početni plan",
    badge: "Popularni paket",
    price: { monthly: "27", yearly: "270" },
    currency: "€",
    note: "Cena u dinarima okvirno, zavisno od kursa. Plaćanje Visa i MasterCard karticom.",
    features: [
      "Pristup svim osnovnim funkcijama",
      "Mesečni izveštaji",
      "Email podrška",
      "1 korisnički nalog",
    ],
    highlighted: false,
  },
  {
    key: "pro",
    name: "Napredni plan",
    badge: "Napredni paket",
    price: { monthly: "39", yearly: "390" },
    currency: "€",
    note: "Cena u dinarima okvirno, zavisno od kursa. Plaćanje Visa i MasterCard karticom.",
    features: [
      "Sve iz Početnog plana",
      "Napredne funkcije i integracije",
      "Prioritetna podrška",
      "Do 5 korisničkih naloga",
      "Rani pristup novim funkcijama",
    ],
    highlighted: true,
  },
];

export function isPlanKey(value: unknown): value is PlanKey {
  return value === "starter" || value === "pro";
}

export function isBillingInterval(value: unknown): value is BillingInterval {
  return value === "monthly" || value === "yearly";
}
