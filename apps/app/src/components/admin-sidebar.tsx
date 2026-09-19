"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/ui/sidebar";
import { ArrowLeft, LayoutDashboard, type LucideIcon, ShieldCheck, Users } from "lucide-react";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser, type SidebarUser } from "./nav-user";

interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Kontrolna tabla", icon: LayoutDashboard },
  { href: "/admin/korisnici", label: "Korisnici", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  // @ludus:inject:admin-nav:links
];

/** Sidebar admin portala — vidi ga samo admin (guard je u layout-u i stranicama). */
export function AdminSidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{"Sibirsko Zdravlje"}</span>
                  <span className="truncate text-muted-foreground text-xs">Admin portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administracija</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Nazad u aplikaciju">
                  <Link href="/dashboard">
                    <ArrowLeft />
                    <span>Nazad u aplikaciju</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
