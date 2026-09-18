import { Separator } from "@repo/ui";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@repo/ui/ui/sidebar";
import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { requireAdmin } from "@/lib/admin";

/**
 * Okvir admin portala: poseban sidebar sa admin linkovima. Guard po ulozi je
 * i u svakoj stranici i akciji — layout je samo prva linija.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  const metadata = (user.user_metadata ?? {}) as { full_name?: string };
  const sidebarUser = {
    name: metadata.full_name ?? user.email?.split("@")[0] ?? "Korisnik",
    email: user.email ?? "",
    role: "admin",
  };

  return (
    <SidebarProvider>
      <AdminSidebar user={sidebarUser} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <span className="font-medium text-sm">Admin portal</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
