"use server";

import { createSupabaseAdminClient } from "@repo/auth/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

/**
 * Dodela uloge (admin/user) — guard po ulozi važi i OVDE, ne samo na stranici:
 * server akcija je javno pozivljiv endpoint. Sopstvena uloga se ne menja,
 * da admin ne ostane bez pristupa slučajnim klikom.
 */
export async function setRole(formData: FormData) {
  const user = await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!userId || (role !== "admin" && role !== "user")) {
    redirect("/admin/korisnici?error=Nevalidan%20zahtev.");
  }
  if (userId === user.id) {
    redirect("/admin/korisnici?error=Ne%20mo%C5%BEe%C5%A1%20da%20menja%C5%A1%20sopstvenu%20ulogu.");
  }

  // app_metadata se spaja plitko — ostala polja (provider...) ostaju netaknuta.
  const admin = createSupabaseAdminClient();
  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { role },
  });
  if (error) {
    redirect(
      `/admin/korisnici?error=${encodeURIComponent(`Promena uloge nije uspela: ${error.message}`)}`,
    );
  }

  revalidatePath("/admin/korisnici");
  redirect(`/admin/korisnici?message=${encodeURIComponent("Uloga ažurirana.")}`);
}
