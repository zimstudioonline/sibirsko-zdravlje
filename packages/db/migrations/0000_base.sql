-- ============================================================================
-- Bazna migracija: profili + demo notes tabela, RLS uključen na svemu.
-- RLS politike žive OVDE, u SQL migracijama — jedini izvor istine.
-- ============================================================================

create table "public"."profiles" (
  "id" uuid primary key references auth.users(id) on delete cascade,
  "email" text not null,
  "full_name" text,
  "created_at" timestamptz not null default now()
);
--> statement-breakpoint
alter table "public"."profiles" enable row level security;
--> statement-breakpoint
create policy "profiles_select_own" on "public"."profiles"
  for select using ((select auth.uid()) = id);
--> statement-breakpoint
create policy "profiles_update_own" on "public"."profiles"
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
--> statement-breakpoint
-- Trigger: automatski kreira profil kad se korisnik registruje.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;
--> statement-breakpoint
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
--> statement-breakpoint
create table "public"."notes" (
  "id" uuid primary key default gen_random_uuid(),
  "user_id" uuid not null references auth.users(id) on delete cascade,
  "content" text not null,
  "created_at" timestamptz not null default now()
);
--> statement-breakpoint
alter table "public"."notes" enable row level security;
--> statement-breakpoint
create policy "notes_select_own" on "public"."notes"
  for select using ((select auth.uid()) = user_id);
--> statement-breakpoint
create policy "notes_insert_own" on "public"."notes"
  for insert with check ((select auth.uid()) = user_id);
--> statement-breakpoint
create policy "notes_update_own" on "public"."notes"
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
--> statement-breakpoint
create policy "notes_delete_own" on "public"."notes"
  for delete using ((select auth.uid()) = user_id);
