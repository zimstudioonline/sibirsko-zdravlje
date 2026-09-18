"use server";

import { createSupabaseServerClient } from "@repo/auth/server";
import { clientEnv } from "@repo/config/env";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Svi auth tokovi na jednom mestu: prijava, registracija, Google OAuth,
 * odjava, zaboravljena lozinka, promena lozinke.
 * Greške se vraćaju kroz query parametre (?error= / ?message=).
 */

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function withParam(path: string, key: "error" | "message", text: string): string {
  // encodeURIComponent je obavezan: naša slova (š, č...) nisu validna u Location headeru
  return `${path}?${key}=${encodeURIComponent(text)}`;
}

function siteUrl(): string {
  return clientEnv().NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function login(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    redirect(withParam("/login", "error", "Unesi ispravan email i lozinku od bar 8 karaktera."));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    redirect(withParam("/login", "error", "Pogrešan email ili lozinka."));
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    redirect(withParam("/signup", "error", "Unesi ispravan email i lozinku od bar 8 karaktera."));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback?next=/dashboard` },
  });
  if (error) {
    redirect(withParam("/signup", "error", error.message));
  }

  // Lokalni stack auto-potvrđuje email → sesija postoji odmah.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }
  redirect(withParam("/signup", "message", "Proveri email i potvrdi registraciju."));
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl()}/auth/callback?next=/dashboard` },
  });
  if (error || !data.url) {
    redirect(
      withParam(
        "/login",
        "error",
        "Google prijava nije podešena. Uključi Google provider u Supabase podešavanjima (vidi README).",
      ),
    );
  }
  redirect(data.url);
}

export async function requestPasswordReset(formData: FormData) {
  const email = z.string().email().safeParse(formData.get("email"));
  if (!email.success) {
    redirect(withParam("/forgot-password", "error", "Unesi ispravan email."));
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${siteUrl()}/auth/callback?next=/reset-password`,
  });

  // Ista poruka bez obzira da li nalog postoji — ne otkrivamo tuđe emailove.
  redirect(
    withParam("/forgot-password", "message", "Ako nalog postoji, poslali smo ti link za promenu lozinke."),
  );
}

export async function changePassword(formData: FormData) {
  const backTo = typeof formData.get("backTo") === "string" ? String(formData.get("backTo")) : "";
  // Samo interne putanje — "//host" je protokol-relativni URL, tj. open-redirect.
  const back =
    backTo.startsWith("/") && !backTo.startsWith("//") ? backTo : "/dashboard/settings";

  const password = formData.get("password");
  const confirm = formData.get("confirm");
  const parsed = z.string().min(8).safeParse(password);
  if (!parsed.success) {
    redirect(withParam(back, "error", "Lozinka mora imati bar 8 karaktera."));
  }
  if (password !== confirm) {
    redirect(withParam(back, "error", "Lozinke se ne poklapaju."));
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data });
  if (error) {
    redirect(withParam(back, "error", error.message));
  }

  redirect(withParam("/dashboard/settings", "message", "Lozinka je promenjena."));
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
