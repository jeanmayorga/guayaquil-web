"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { Home, CalendarDays } from "lucide-react";

import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isEvents = pathname?.startsWith("/events") ?? false;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center px-2 py-1">
          <Logo className="h-14 w-auto" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isEvents}>
                  <Link href="/events">
                    <CalendarDays />
                    <span>Eventos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 px-2 py-1 group-data-[collapsible=icon]:hidden">
          <span className="text-sm text-muted-foreground">Tema</span>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
