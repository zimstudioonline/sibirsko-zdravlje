"use client";

import { marketingEnv } from "@repo/config/marketing-env";
import { Button, Input, Label, Textarea } from "@repo/ui";
import { useState } from "react";

/**
 * Upit forma — šalje se direktno na Google Apps Script Web App (bez
 * sopstvenog servera/baze), vidi apps/marketing/google-apps-script/SETUP.md.
 *
 * Apps Script webapp ne dozvoljava čitanje odgovora sa custom CORS headera,
 * pa se šalje sa mode: "no-cors" — uspeh se pretpostavlja ako fetch ne baci
 * grešku (mrežni problem). To je poznato ograničenje ovog pristupa.
 */

interface InquiryFormProps {
  /** Unapred popunjeno polje "Proizvod koji vas interesuje" (npr. sa kartice proizvoda). */
  defaultProduct?: string;
  /** Kompaktna varijanta bez heading-a, za sticky sidebar / mobile sheet. */
  compact?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ defaultProduct, compact }: InquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = marketingEnv().NEXT_PUBLIC_INQUIRY_FORM_ENDPOINT;
  const contactEmail = marketingEnv().NEXT_PUBLIC_CONTACT_EMAIL;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;

    const formData = new FormData(event.currentTarget);
    setStatus("submitting");
    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-6 text-center">
        <p className="font-semibold text-ink">Upit je poslat!</p>
        <p className="mt-1 text-muted-foreground text-sm">
          Javićemo vam se u najkraćem roku. Hvala na poverenju.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-primary text-sm underline underline-offset-2"
        >
          Pošalji još jedan upit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!compact ? (
        <div>
          <h3 className="font-semibold text-ink text-lg">Upit za proizvode</h3>
          <p className="mt-1 text-muted-foreground text-sm">
            Popunite formu i javićemo vam se sa svim informacijama o ceni i dostupnosti.
          </p>
        </div>
      ) : null}

      <div>
        <Label htmlFor="ime" className="mb-1.5">
          Ime i prezime *
        </Label>
        <Input id="ime" name="ime" required autoComplete="name" />
      </div>

      <div>
        <Label htmlFor="telefon" className="mb-1.5">
          Telefon *
        </Label>
        <Input id="telefon" name="telefon" type="tel" required autoComplete="tel" />
      </div>

      <div>
        <Label htmlFor="adresa" className="mb-1.5">
          Ulica i broj
        </Label>
        <Input id="adresa" name="adresa" autoComplete="address-line1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="grad" className="mb-1.5">
            Grad / Mesto
          </Label>
          <Input id="grad" name="grad" autoComplete="address-level2" />
        </div>
        <div>
          <Label htmlFor="postanskiBroj" className="mb-1.5">
            Poštanski broj
          </Label>
          <Input id="postanskiBroj" name="postanskiBroj" autoComplete="postal-code" />
        </div>
      </div>

      <div>
        <Label htmlFor="proizvod" className="mb-1.5">
          Proizvod koji vas interesuje *
        </Label>
        <Textarea
          id="proizvod"
          name="proizvod"
          required
          defaultValue={defaultProduct}
          rows={compact ? 2 : 3}
        />
      </div>

      <div>
        <Label htmlFor="kolicina" className="mb-1.5">
          Količina
        </Label>
        <Input id="kolicina" name="kolicina" placeholder="npr. 1 pakovanje" />
      </div>

      <div>
        <Label htmlFor="email" className="mb-1.5">
          E-mail
        </Label>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <label className="flex items-start gap-2 text-muted-foreground text-xs leading-snug">
        <input type="checkbox" required className="mt-0.5" />
        Slažem se da me kontaktirate telefonom ili e-mailom povodom ovog upita.
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
          Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite direktno.
        </p>
      ) : null}

      <Button type="submit" disabled={!endpoint || status === "submitting"} className="w-full">
        {status === "submitting" ? "Slanje..." : "Pošalji upit"}
      </Button>
    </form>
  );
}
