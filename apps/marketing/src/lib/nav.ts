import { ADAPTOGENI_PATH } from "@/lib/content/adaptogeni";
import { BILJKE_PATH, biljke } from "@/lib/content/biljke";
import { ZDRAVLJE_PATH, zdravljeTeme } from "@/lib/content/zdravlje";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

/**
 * Glavni meni portala. Namerno bez kataloga i proizvoda — SibirskaPriroda.com
 * je edukacija + funnel; proizvodi su na SibirskoZdravlje.com.
 */
export const mainNav: NavItem[] = [
  { href: "/", label: "Početna" },
  {
    href: BILJKE_PATH,
    label: "Sibirske biljke",
    children: biljke.map((item) => ({ href: `${BILJKE_PATH}/${item.slug}`, label: item.label })),
  },
  { href: ADAPTOGENI_PATH, label: "Adaptogeni" },
  {
    href: ZDRAVLJE_PATH,
    label: "Zdravlje",
    children: zdravljeTeme.map((item) => ({
      href: `${ZDRAVLJE_PATH}/${item.slug}`,
      label: item.label,
    })),
  },
  { href: "/blog", label: "Blog" },
  { href: "/o-nama", label: "O nama" },
  // @ludus:inject:nav:links
];

/** Funnel dugmad desno u meniju. */
export const FREE_TIPS_PATH = "/besplatni-saveti";
export const BUSINESS_PATH = "/poslovna-prilika";
