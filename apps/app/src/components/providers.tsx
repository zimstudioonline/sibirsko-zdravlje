import type { ReactNode } from "react";

/**
 * Kompozicija root providera. Moduli se kače na anchor ispod —
 * asembler ubacuje njihove provider komponente na to mesto.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* @ludus:inject:root-providers */}
      {children}
    </>
  );
}
