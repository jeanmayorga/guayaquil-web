"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { Home, CalendarDays, Landmark } from "lucide-react";

import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useTimelineNav } from "@/hooks/useTimelineNav";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isEvents = pathname?.startsWith("/events") ?? false;
  const { items, active, go } = useTimelineNav(isEvents);

  // En /events scrollea a la sección; si no, deja que el Link navegue.
  const onSubClick = (e: React.MouseEvent, key: string) => {
    if (!isEvents) return;
    e.preventDefault();
    go(key);
  };

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
                <SidebarMenuSub>
                  {items.map((item) => (
                    <SidebarMenuSubItem key={item.key}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isEvents && active === item.key}
                      >
                        <Link
                          href={`/events#${item.key}`}
                          onClick={(e) => onSubClick(e, item.key)}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/sobre-guayaquil"}
                >
                  <Link href="/sobre-guayaquil">
                    <Landmark />
                    <span>Conoce la ciudad</span>
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
