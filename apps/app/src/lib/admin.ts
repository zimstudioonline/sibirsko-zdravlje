import { createSupabaseServerClient } from "@repo/auth/server";
import { redirect } from "next/navigation";

/**
 * Server guard admin portala. Poziva se u layout-u, SVAKOJ stranici i SVAKOJ
 * server akciji — akcija je javno pozivljiv endpoint, provera samo u layout-u
 * nije dovoljna. Uloga se čita iz app_metadata (postavlja je samo admin API /
 * seed), NIKAD iz user_metadata ni iz klijentskog inputa.
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  if ((user.app_metadata as { role?: string } | null)?.role !== "admin") {
    redirect("/dashboard");
  }
  return user;
}
