"use client";

import { marketingEnv } from "@repo/config/marketing-env";
import { Button, Input, Label } from "@repo/ui";
import Link from "next/link";
import { useState } from "react";

/**
 * Prijava za besplatne savete (ime + email) — isti Google Apps Script Web App
 * kao kontakt forma (vidi apps/marketing/google-apps-script/SETUP.md).
 * Skriveno polje `tip=saveti` Code.gs upisuje u poseban "Saveti" sheet.
 */

type Status = "idle" | "submitting" | "success" | "error";

export function SavetiForm() {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = marketingEnv().NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT;
  const contactEmail = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;

    // React nulira event.currentTarget posle sinhronog dela handlera — sačuvaj
    // referencu pre await-a.
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    try {
      await fetch(endpoint, { method: "POST", mode: "no-cors", body: formData });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-6 text-center">
        <p className="font-semibold text-ink">Hvala, prijava je uspela!</p>
        <p className="mt-1 text-muted-foreground text-sm">
          Uskoro vam stižu prvi saveti. Ako ne vidite naš email, proverite i folder „Promocije“ ili
          „Spam“.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input type="hidden" name="tip" value="saveti" />

      <div>
        <Label htmlFor="saveti-ime" className="mb-1.5">
          Ime *
        </Label>
        <Input id="saveti-ime" name="ime" required autoComplete="given-name" />
      </div>

      <div>
        <Label htmlFor="saveti-email" className="mb-1.5">
          E-mail *
        </Label>
        <Input id="saveti-email" name="email" type="email" required autoComplete="email" />
      </div>

      <label className="flex items-start gap-2 text-muted-foreground text-xs leading-snug">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          Slažem se da mi šaljete savete i vodiče e-mailom. Odjava je moguća u svakom trenutku —
          dovoljno je da odgovorite na bilo koji naš email. Više u{" "}
          <Link href="/privatnost" className="underline">
            politici privatnosti
          </Link>
          .
        </span>
      </label>

      {!endpoint ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-amber-900 text-xs">
          Prijava trenutno nije dostupna. Pišite nam direktno na{" "}
          <a href={`mailto:${contactEmail}`} className="underline">
            {contactEmail}
          </a>
          .
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-destructive text-xs">
          Došlo je do greške pri slanju. Pokušajte ponovo za nekoliko trenutaka.
        </p>
      ) : null}

      <Button type="submit" disabled={!endpoint || status === "submitting"} className="w-full">
        {status === "submitting" ? "Slanje..." : "Želim besplatne savete"}
      </Button>
    </form>
  );
}
