import { marketingEnv } from "@repo/config/marketing-env";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Produkcijska workers.dev adresa → pravi domen (301), da posetioci i Google
 * vide samo jednu adresu sajta. Preview URL-ovi
 * (`<verzija>-sibirsko-zdravlje-marketing.…workers.dev`) se namerno ne diraju.
 */
const WORKERS_DEV_HOST = "sibirsko-zdravlje-marketing.repo-marketing.workers.dev";

export function middleware(request: NextRequest) {
  if (request.headers.get("host") !== WORKERS_DEV_HOST) return NextResponse.next();

  const target = new URL(marketingEnv().NEXT_PUBLIC_MARKETING_URL);
  // Bez podešenog pravog domena (npr. default localhost) ne preusmeravaj.
  if (target.protocol !== "https:" || target.hostname === WORKERS_DEV_HOST) {
    return NextResponse.next();
  }

  // pathname/search se postavljaju na gotov origin (ne `new URL(path, base)`),
  // tako da `//host` putanja ne može da postane open-redirect.
  const url = new URL(target.origin);
  url.pathname = request.nextUrl.pathname;
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
