import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Spajanje Tailwind klasa sa razrešavanjem konflikata (shadcn konvencija). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
