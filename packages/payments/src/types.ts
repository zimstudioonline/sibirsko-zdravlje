/**
 * Apstraktni payment ugovor — jedan interfejs za sve provajdere.
 *
 * - `mor` (merchant of record): Polar, Lemon Squeezy — provajder je prodavac,
 *   rešava PDV/porez umesto tebe.
 * - `gateway` (direktni procesor): Stripe, Raiffeisen — ti si prodavac.
 *
 * Izvor istine za status pretplate je UVEK webhook, nikad redirect URL.
 */

import type { BillingInterval, PlanKey } from "./plans";

export interface CreateCheckoutInput {
  /** Supabase user id — webhook ga mapira nazad na korisnika. */
  userId: string;
  email?: string;
  /** Izabrani plan — provajder ga mapira na svoj product/price ID iz .env. */
  plan: PlanKey;
  /** Interval naplate — mesečna ili godišnja pretplata. */
  interval: BillingInterval;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  /** URL na koji se korisnik redirektuje da plati. */
  url: string;
}

export interface CreatePortalInput {
  /** ID kupca kod provajdera — webhook ga upisuje u subscriptions.customer_id. */
  customerId: string;
  /** ID pretplate kod provajdera (subscriptions.id) — treba Lemon Squeezy-ju. */
  subscriptionId: string;
  returnUrl: string;
}

export interface PortalSession {
  /** URL hostovanog korisničkog portala (otkazivanje, promena plana/kartice). */
  url: string;
}

export interface PaymentProvider {
  id: string;
  label: string;
  kind: "mor" | "gateway";
  mode: "subscription" | "one_time";
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  /**
   * Sesija korisničkog portala provajdera. Opciona — gateway bez hostovanog
   * portala (npr. Raiffeisen) je nema, a UI tada ne prikazuje dugme.
   */
  createPortal?(input: CreatePortalInput): Promise<PortalSession>;
}
