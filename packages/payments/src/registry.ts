import type { PaymentProvider } from "./types";

export interface PaymentRegistry {
  register(provider: PaymentProvider): void;
  /** Bez argumenta vraća podrazumevani (prvi registrovani) provajder. */
  get(id?: string): PaymentProvider;
  list(): PaymentProvider[];
  isEmpty(): boolean;
}

export function createPaymentRegistry(): PaymentRegistry {
  const providers = new Map<string, PaymentProvider>();

  return {
    register(provider) {
      providers.set(provider.id, provider);
    },
    get(id) {
      const provider = id ? providers.get(id) : providers.values().next().value;
      if (!provider) {
        throw new Error(
          id
            ? `Payment provajder "${id}" nije registrovan.`
            : "Nijedan payment provajder nije registrovan. Dodaj payment modul kroz konfigurator.",
        );
      }
      return provider;
    },
    list() {
      return [...providers.values()];
    },
    isEmpty() {
      return providers.size === 0;
    },
  };
}
