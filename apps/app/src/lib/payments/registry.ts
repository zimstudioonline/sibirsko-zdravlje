import { createPaymentRegistry } from "@repo/payments";

/**
 * App-nivo kompozicija payment provajdera. Payment moduli registruju
 * svoje provajdere na anchor ispod (radi to asembler pri generisanju).
 */
export const payments = createPaymentRegistry();

// @ludus:inject:payments:provider
