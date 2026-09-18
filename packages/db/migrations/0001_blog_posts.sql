-- Blog objave: piše ih admin kroz /admin/blog (service-role, zaobilazi RLS,
-- namerno — nema INSERT/UPDATE/DELETE politika). Javnost čita SAMO objavljene.

create table "public"."posts" (
  "id" uuid primary key default gen_random_uuid(),
  "slug" text not null unique,
  "title" text not null,
  "description" text not null default '',
  "content" text not null default '',
  "published" boolean not null default false,
  "published_at" timestamptz,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);
--> statement-breakpoint
alter table "public"."posts" enable row level security;
--> statement-breakpoint
create policy "posts_public_read" on "public"."posts"
  for select using (published = true);
--> statement-breakpoint
insert into "public"."posts" ("slug", "title", "description", "content", "published", "published_at")
values (
  'dobrodoslica',
  'Dobrodošao na blog',
  'Prvi tekst — kako ovaj blog radi i kako dodaješ nove objave.',
  E'Ovaj blog se uređuje iz admin portala: objave žive u bazi, a piše ih admin\nna **/admin/blog** (markdown editor).\n\n## Kako dodaješ novu objavu\n\n1. Prijavi se admin nalogom i otvori **Admin portal → Blog**.\n2. Klikni **Nova objava**, popuni naslov i opis, napiši tekst u editoru.\n3. Štikliraj **Objavljeno** i sačuvaj — tekst je odmah na sajtu.\n\n## Zašto ovako\n\n- Objave se dodaju bez novog deploy-a — baza je izvor istine.\n- Javnost kroz RLS vidi isključivo objavljene tekstove.\n- Nacrti (bez štiklirane objave) ostaju vidljivi samo u admin portalu.',
  true,
  now()
);
