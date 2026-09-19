import { AppSidebar } from "@/components/app-sidebar";
import { createSupabaseServerClient } from "@repo/auth/server";
import { Separator } from "@repo/ui";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@repo/ui/ui/sidebar";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

/** Zajednički okvir dashboarda: sidebar + header. Stranice renderuju samo sadržaj. */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const metadata = (user.user_metadata ?? {}) as { full_name?: string };
  // Uloga živi u app_metadata — može da je menja samo admin API, ne korisnik.
  const role = (user.app_metadata as { role?: string } | null)?.role;
  const sidebarUser = {
    name: metadata.full_name ?? user.email?.split("@")[0] ?? "Korisnik",
    email: user.email ?? "",
    role,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={sidebarUser} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <span className="font-medium text-sm">{"Sibirsko Zdravlje"}</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
