"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import {
  Home,
  CalendarDays,
  CalendarRange,
  CalendarPlus,
  Flame,
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

// Cada filtro corresponde a una sección del timeline en /events.
const filters: { name: string; key: string; icon: LucideIcon }[] = [
  { name: "Hoy", key: "today", icon: Flame },
  { name: "Esta semana", key: "this-week", icon: CalendarRange },
  { name: "Este mes", key: "this-month", icon: CalendarDays },
  { name: "Próximo mes", key: "next-month", icon: CalendarPlus },
  { name: "Pasados", key: "past", icon: History },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isEvents = pathname?.startsWith("/events") ?? false;

  const [activeSection, setActiveSection] = React.useState<string>("today");

  // Scroll-spy: resalta el filtro de la sección visible.
  React.useEffect(() => {
    if (!isEvents) return;
    let observer: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const setup = () => {
      const els = filters
        .map((f) => document.getElementById(f.key))
        .filter((el): el is HTMLElement => el !== null);
      if (els.length === 0) {
        timer = setTimeout(setup, 300);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );
          if (visible[0]) setActiveSection(visible[0].target.id);
        },
        { rootMargin: "-15% 0px -75% 0px" }
      );
      els.forEach((el) => observer!.observe(el));
    };

    setup();
    return () => {
      observer?.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [isEvents, pathname]);

  // En /events hace scroll suave a la sección; si no, deja navegar el Link.
  const onFilterClick = (e: React.MouseEvent, key: string) => {
    if (!isEvents) return;
    const el = document.getElementById(key);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(key);
    window.history.replaceState(null, "", `/events#${key}`);
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
                    isActive={isEvents && activeSection === f.key}
                  >
                    <Link
                      href={`/events#${f.key}`}
                      onClick={(e) => onFilterClick(e, f.key)}
                    >
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
