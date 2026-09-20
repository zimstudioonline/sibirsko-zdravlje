/**
 * Podaci o katalogu proizvoda.
 *
 * Nema baze za ovaj modul (deploy ide na Cloudflare bez servera) — kategorije
 * i proizvodi žive kao statički podaci. Sami proizvodi su u `products-data.ts`
 * (generisano iz WooCommerce CSV eksporta) — ovde žive samo kategorije i tipovi.
 *
 * Duži opisi proizvoda (markdown) namerno NISU deo `Product`/`products-data.ts` —
 * žive u `product-descriptions.ts`, koji uvozi SAMO stranica pojedinačnog
 * proizvoda. `products-data.ts` uvoze i stranice liste/kategorija (renderuju
 * sve proizvode odjednom), pa dodavanje ~600KB opisa u svaki objekat je
 * naduvalo taj fajl dovoljno da obori Cloudflare Worker resource limit na
 * `/katalog` (Error 1102) — otud razdvajanje.
 */

import { products } from "./products-data";

export { products };

export interface Category {
  slug: string;
  name: string;
  /** Grupa u sidebaru — izostavi za "top-level" kategoriju bez grupe. */
  group?: "Namena" | "Brendovi BAD";
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  /** Slugovi kategorija kojima proizvod pripada (namena + brend + top-level). */
  categorySlugs: string[];
  shortDescription: string;
  /** URL slike proizvoda (spoljni link ili putanja u /public). */
  image?: string;
  /** Cena u RSD (dinari), bez simbola valute. Izostavi ako je "cena na upit". */
  price?: number;
}

export const categoryGroups: Array<{ id: "Namena" | "Brendovi BAD"; label: string }> = [
  { id: "Namena", label: "Namena" },
  { id: "Brendovi BAD", label: "Brendovi BAD" },
];

export const categories: Category[] = [
  // — Namena —
  { slug: "detoks-i-ciscenje-organizma", name: "Detoks i čišćenje organizma", group: "Namena" },
  { slug: "anti-age-proizvode", name: "Anti-age proizvode", group: "Namena" },
  { slug: "antistres-zastita", name: "Antistres-zaštita", group: "Namena" },
  {
    slug: "suplementi-za-energiju-i-fokus",
    name: "Suplementi za energiju i fokus",
    group: "Namena",
  },
  { slug: "elasticni-zglobovi", name: "Elastični zglobovi", group: "Namena" },
  { slug: "duga-mladost", name: "Duga mladost", group: "Namena" },
  {
    slug: "suplementi-za-zeludac-i-creva",
    name: "Suplementi za želudac i creva",
    group: "Namena",
  },
  { slug: "suplementi-za-jetru", name: "Suplementi za jetru", group: "Namena" },
  { slug: "zdravi-bubrezi", name: "Zdravi bubrezi", group: "Namena" },
  { slug: "zdravo-srce", name: "Zdravo srce", group: "Namena" },
  { slug: "cvrste-kosti", name: "Čvrste kosti", group: "Namena" },
  { slug: "suplementi-za-vid", name: "Suplementi za vid", group: "Namena" },
  { slug: "prevencija-alergija", name: "Prevencija alergija", group: "Namena" },
  { slug: "prevencija-dijabetesa", name: "Prevencija dijabetesa", group: "Namena" },
  { slug: "suplementi-za-imunitet", name: "Suplementi za imunitet", group: "Namena" },
  { slug: "antiparazitni-program", name: "Antiparazitni program", group: "Namena" },
  { slug: "celicni-nervi", name: "Čelični nervi", group: "Namena" },
  { slug: "suplementi-za-zene", name: "Suplementi za žene", group: "Namena" },
  { slug: "suplementi-za-muskarce", name: "Suplementi za muškarce", group: "Namena" },
  {
    slug: "suplementi-za-trudnice-i-dojilje",
    name: "Suplementi za trudnice i dojilje",
    group: "Namena",
  },
  { slug: "suplementi-za-decu", name: "Suplementi za decu", group: "Namena" },
  { slug: "vegetarijanski-proizvodi", name: "Vegetarijanski proizvodi", group: "Namena" },

  // — Brendovi BAD —
  { slug: "expert-line", name: "Expert Line", group: "Brendovi BAD" },
  {
    slug: "siberian-super-natural-nutrition-eco",
    name: "Siberian Super Natural Nutrition ECO",
    group: "Brendovi BAD",
  },
  {
    slug: "siberian-super-natural-nutrition",
    name: "Siberian Super Natural Nutrition",
    group: "Brendovi BAD",
  },
  { slug: "3d-cube", name: "3D Cube", group: "Brendovi BAD" },
  { slug: "daily-box", name: "Daily Box", group: "Brendovi BAD" },
  { slug: "corenrg", name: "CoreNRG", group: "Brendovi BAD" },
  { slug: "essential-botanics", name: "Essential Botanics", group: "Brendovi BAD" },
  { slug: "essential-vitamins", name: "Essential Vitamins", group: "Brendovi BAD" },
  {
    slug: "essential-minerals-elemvitals",
    name: "Essential Minerals / Elemvitals",
    group: "Brendovi BAD",
  },
  {
    slug: "essential-sorbents-lymphosan",
    name: "Essential Sorbents / Lymphosan",
    group: "Brendovi BAD",
  },
  { slug: "essential-fatty-acids", name: "Essential Fatty Acids", group: "Brendovi BAD" },
  { slug: "essential-probiotics", name: "Essential Probiotics", group: "Brendovi BAD" },
  { slug: "womens-health", name: "Women's Health", group: "Brendovi BAD" },
  { slug: "sibirski-balzami", name: "Sibirski balzami", group: "Brendovi BAD" },
  { slug: "renaissance-triple-set", name: "Renaissance Triple Set", group: "Brendovi BAD" },
  { slug: "synchrovitals", name: "Synchrovitals", group: "Brendovi BAD" },
  { slug: "healthy-rhythms", name: "Healthy Rhythms", group: "Brendovi BAD" },
  { slug: "novomin", name: "Novomin", group: "Brendovi BAD" },
  { slug: "paracleanse-triple-set", name: "Paracleanse Triple Set", group: "Brendovi BAD" },
  { slug: "adaptovit", name: "Adaptovit", group: "Brendovi BAD" },
  { slug: "vitamama", name: "Vitamama", group: "Brendovi BAD" },
  { slug: "kolekcija-fitocajeva", name: "Kolekcija fitočajeva", group: "Brendovi BAD" },
  { slug: "fitness-catalyst", name: "Fitness Catalyst", group: "Brendovi BAD" },
  { slug: "proteini", name: "Proteini", group: "Brendovi BAD" },
  { slug: "paste-za-zube", name: "Paste za zube", group: "Brendovi BAD" },
  {
    slug: "kozmetika-siberian-wellness",
    name: "Kozmetika Siberian Wellness",
    group: "Brendovi BAD",
  },
  {
    slug: "kozmetika-siberian-wellness-herbal-cosmetics",
    name: "Kozmetika Siberian Wellness Herbal Cosmetics",
    group: "Brendovi BAD",
  },
  {
    slug: "kozmetika-experalta-platinum",
    name: "Kozmetika Experalta Platinum",
    group: "Brendovi BAD",
  },
  { slug: "kozmetika-experalta-pro", name: "Kozmetika Experalta Pro", group: "Brendovi BAD" },
  { slug: "kozmetika-forest-dreams", name: "Kozmetika Forest Dreams", group: "Brendovi BAD" },

  // — top-level —
  { slug: "sport", name: "Sport" },
  { slug: "ishrana", name: "Ishrana" },
  { slug: "kozmetika", name: "Kozmetika" },
  { slug: "parfimerija", name: "Parfimerija" },
  { slug: "greenpin", name: "GreenPin" },
  { slug: "za-konsultante", name: "Za konsultante" },
  { slug: "gotovi-kompleti", name: "Gotovi kompleti" },
  { slug: "novine", name: "Novine" },
  { slug: "akcije", name: "Akcije" },
];

export const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((product) => product.categorySlugs.includes(slug));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
