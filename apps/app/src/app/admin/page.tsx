import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdminClient } from "@repo/auth/server";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Users } from "lucide-react";

export const metadata = { title: "Admin portal" };

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Broj registrovanih — profiles ima red po korisniku (trigger on_auth_user_created).
  const admin = createSupabaseAdminClient();
  const { count, error } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true });
  if (error) {
    throw new Error(`Čitanje broja korisnika nije uspelo: ${error.message}`);
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium text-sm">Registrovani korisnici</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-bold text-3xl">{count ?? 0}</p>
          </CardContent>
        </Card>
        {/* @ludus:inject:admin-dashboard:cards */}
      </div>
    </div>
  );
}
