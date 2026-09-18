"use client";

import { useEffect, useState } from "react";

/**
 * Cookie consent gate — analitika i pixel skripte se učitavaju tek posle
 * korisničkog pristanka (EU pravila). Ne zaobilazi ovaj mehanizam.
 */

export type ConsentStatus = "unknown" | "granted" | "denied";

const STORAGE_KEY = "ludus-consent";
const CHANGE_EVENT = "ludus-consent-change";

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") {
    return "unknown";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unknown";
}

export function setConsent(status: Exclude<ConsentStatus, "unknown">): void {
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useConsent(): ConsentStatus {
  const [status, setStatus] = useState<ConsentStatus>("unknown");

  useEffect(() => {
    setStatus(getConsent());
    const onChange = () => setStatus(getConsent());
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  return status;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === "unknown");
    const onChange = () => setVisible(getConsent() === "unknown");
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-xl border bg-card p-4 text-card-foreground shadow-lg">
      <p className="text-sm">
        Koristimo kolačiće za analitiku. Skripte se učitavaju tek uz tvoj pristanak.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="cursor-pointer rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
        >
          Prihvatam
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="cursor-pointer rounded-lg border px-4 py-2 font-medium text-sm hover:bg-accent"
        >
          Odbijam
        </button>
      </div>
    </div>
  );
}
