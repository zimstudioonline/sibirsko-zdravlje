import { marketingEnv } from "@repo/config/marketing-env";
import { Phone } from "lucide-react";

/**
 * Plutajuća dugmad na strani pojedinačnog proizvoda: WhatsApp (sa unapred
 * popunjenom porukom) + direktan poziv.
 *
 * Prvobitno je ovde bio Viber sa istim ciljem, ali viber://chat nema
 * zvaničan parametar za draft poruku (potvrđeno testiranjem na telefonu —
 * ne radi kao kod WhatsAppa). wa.me?text= je zvanično podržan i pouzdano
 * radi i na mobilnom i na desktopu (otvara WhatsApp Web ako nema app).
 */
export function ProductContactButtons({ productName }: { productName: string }) {
  const number = marketingEnv().NEXT_PUBLIC_VIBER_NUMBER;
  if (!number) return null;

  const message = `Zdravo, želim da poručim: ${productName}`;
  const whatsappHref = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const callHref = `tel:+${number}`;

  return (
    <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-3 lg:bottom-6">
      <a
        href={callHref}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Pozovi odmah"
        title="Pozovi odmah"
      >
        <Phone className="size-6" />
        <span className="sr-only">Pozovi odmah</span>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Poruči preko WhatsApp-a"
        title="Poruči preko WhatsApp-a"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.75.46 3.45 1.33 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96C22 6.46 17.54 2 12.04 2Zm5.84 14.06c-.25.7-1.24 1.28-2.03 1.45-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.32-5.11-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.27.1 1.75.83 2.05 .98.3.15.5.23.57.35.08.13.08.75-.17 1.45Z" />
        </svg>
        <span className="sr-only">Poruči preko WhatsApp-a</span>
      </a>
    </div>
  );
}
