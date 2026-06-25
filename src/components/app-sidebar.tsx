"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import {
  Home,
  CalendarDays,
  CalendarRange,
  CalendarPlus,
  Flame,
  LayoutGrid,
  History,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
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
} from "@/components/ui/sidebar";

const filters: { name: string; key: string; icon: LucideIcon }[] = [
  { name: "Hoy", key: "today", icon: Flame },
  { name: "Esta semana", key: "this-week", icon: CalendarRange },
  { name: "Este mes", key: "this-month", icon: CalendarDays },
  { name: "Próximo mes", key: "next-month", icon: CalendarPlus },
  { name: "Todos", key: "all", icon: LayoutGrid },
  { name: "Pasados", key: "past", icon: History },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isEvents = pathname?.startsWith("/events") ?? false;
  // El listado usa "today" por defecto cuando no hay query param.
  const currentTab = searchParams.get("tab") ?? "today";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center px-2 py-1">
          <Logo className="h-14 w-auto" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegar</SidebarGroupLabel>
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

        <SidebarGroup>
          <SidebarGroupLabel>Cuándo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filters.map((f) => (
                <SidebarMenuItem key={f.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={isEvents && currentTab === f.key}
                  >
                    <Link href={`/events?tab=${f.key}`}>
                      <f.icon />
                      <span>{f.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
