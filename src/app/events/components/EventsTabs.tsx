"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

export const tabs = [
  {
    name: "Pasados",
    pathname: "/events/past",
  },
  {
    name: "Todos",
    pathname: "/events/all",
  },
  {
    name: "Hoy",
    pathname: "/events/today",
  },
  {
    name: "Esta semana",
    pathname: "/events/this-week",
  },
  {
    name: "Este mes",
    pathname: "/events/this-month",
  },
  {
    name: "Siguiente mes",
    pathname: "/events/next-month",
  },
];

export function EventTabs() {
  const pathname = usePathname();

  return (
    <nav className="space-x-1 flex overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isTabActive = tab.pathname === pathname;

        return (
          <Link href={tab.pathname} key={tab.pathname}>
            <button
              className={cn(
                "py-2 px-4 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-cyan-500/50 hover:text-cyan-800 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 transition-all active:scale-95 text-nowrap",
                isTabActive &&
                  "bg-cyan-500/50 dark:bg-cyan-500/50 text-cyan-800 dark:text-white/70"
              )}
            >
              {tab.name}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
