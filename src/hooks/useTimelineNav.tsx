"use client";

import { useEffect, useState } from "react";
import {
  Flame,
  CalendarRange,
  CalendarDays,
  CalendarPlus,
  History,
  type LucideIcon,
} from "lucide-react";

export const TIMELINE_ITEMS: {
  key: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "today", label: "Hoy", icon: Flame },
  { key: "this-week", label: "Esta semana", icon: CalendarRange },
  { key: "this-month", label: "Este mes", icon: CalendarDays },
  { key: "next-month", label: "Próximo mes", icon: CalendarPlus },
  { key: "past", label: "Pasados", icon: History },
];

// Lock compartido: al saltar a una sección, se bloquea la carga del resto
// por un instante para que un salto no dispare las secciones intermedias.
export const navLock: { key: string | null } = { key: null };

// Maneja el scroll-spy (sección visible) y el scroll suave a cada sección.
// `enabled` evita el observer en páginas que no tienen las secciones.
export function useTimelineNav(enabled = true) {
  const [active, setActive] = useState<string>("today");

  useEffect(() => {
    if (!enabled) return;
    let observer: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const setup = () => {
      const els = TIMELINE_ITEMS.map((i) =>
        document.getElementById(i.key)
      ).filter((el): el is HTMLElement => el !== null);
      if (els.length === 0) {
        if (attempts++ > 20) return;
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
  }, [enabled]);

  const go = (key: string) => {
    // Bloquea la carga de las demás secciones mientras se hace el salto.
    navLock.key = key;
    // Salto instantáneo (no animado): evita que el scroll pase por las
    // secciones intermedias y dispare su carga en el camino.
    const scroll = () =>
      document
        .getElementById(key)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    scroll();
    setActive(key);
    // Re-ajusta tras un instante (si el layout se corrió) y libera el lock.
    setTimeout(scroll, 250);
    setTimeout(() => {
      navLock.key = null;
    }, 700);
  };

  return { items: TIMELINE_ITEMS, active, go };
}
