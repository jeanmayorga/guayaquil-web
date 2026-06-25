"use client";

import * as React from "react";
import {
  Flame,
  CalendarRange,
  CalendarDays,
  CalendarPlus,
  History,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const items: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "today", label: "Hoy", icon: Flame },
  { key: "this-week", label: "Esta semana", icon: CalendarRange },
  { key: "this-month", label: "Este mes", icon: CalendarDays },
  { key: "next-month", label: "Próximo mes", icon: CalendarPlus },
  { key: "past", label: "Pasados", icon: History },
];

export function TimelineNav({ className }: { className?: string }) {
  const [active, setActive] = React.useState<string>("today");

  // Scroll-spy: resalta la sección visible.
  React.useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const setup = () => {
      const els = items
        .map((i) => document.getElementById(i.key))
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
          if (visible[0]) setActive(visible[0].target.id);
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
  }, []);

  const go = (key: string) => {
    document
      .getElementById(key)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(key);
  };

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => go(item.key)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all active:scale-[.98]",
            active === item.key
              ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <item.icon className="size-[18px] flex-none" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
