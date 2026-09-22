"use client";

import { marketingEnv } from "@repo/config/marketing-env";
import { Button, Input, Label, Textarea } from "@repo/ui";
import { useState } from "react";

/**
 * Kontakt forma — isti Google Apps Script Web App kao upit forma
 * (vidi apps/marketing/google-apps-script/SETUP.md), razlikuje se po
 * skrivenom polju `tip=kontakt` koje Code.gs koristi da upiše u poseban
 * "Kontakt" sheet i pošalje drugačije formatiran email.
 */

type Status = "idle" | "submitting" | "success" | "error";

export function KontaktForm() {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = marketingEnv().NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT;
  const contactEmail = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;

    // React nulira event.currentTarget posle sinhronog dela handlera — sačuvaj
    // referencu pre await-a, ne oslanjaj se na event posle fetch-a.
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-6 text-center">
        <p className="font-semibold text-ink">Poruka je poslata!</p>
        <p className="mt-1 text-muted-foreground text-sm">
          Javićemo vam se u najkraćem roku. Hvala na poverenju.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-primary text-sm underline underline-offset-2"
        >
          Pošalji još jednu poruku
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input type="hidden" name="tip" value="kontakt" />

      <div>
        <Label htmlFor="kontakt-ime" className="mb-1.5">
          Ime i prezime *
        </Label>
        <Input id="kontakt-ime" name="ime" required autoComplete="name" />
      </div>

      <div>
        <Label htmlFor="kontakt-email" className="mb-1.5">
          E-mail *
        </Label>
        <Input id="kontakt-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div>
        <Label htmlFor="kontakt-poruka" className="mb-1.5">
          Poruka *
        </Label>
        <Textarea id="kontakt-poruka" name="poruka" required rows={4} />
      </div>

      <label className="flex items-start gap-2 text-muted-foreground text-xs leading-snug">
        <input type="checkbox" required className="mt-0.5" />
        Slažem se da me kontaktirate e-mailom povodom ove poruke.
      </label>

      {!endpoint ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-amber-900 text-xs">
          Forma trenutno nije dostupna. Pišite nam direktno na{" "}
          <a href={`mailto:${contactEmail}`} className="underline">
            {contactEmail}
          </a>
          .
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-destructive text-xs">
          Došlo je do greške pri slanju. Pokušajte ponovo ili nas kontaktirajte direktno.
        </p>
      ) : null}

      <Button type="submit" disabled={!endpoint || status === "submitting"} className="w-full">
        {status === "submitting" ? "Slanje..." : "Pošalji poruku"}
      </Button>
    </form>
  );
}
