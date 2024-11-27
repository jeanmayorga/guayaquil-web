"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export const tabs = [
  {
    name: "Pasados",
    key: "past",
    pathname: "/events?tab=past",
  },
  {
    name: "Todos",
    key: "all",
    pathname: "/events?tab=all",
  },
  {
    name: "Hoy",
    key: "today",
    pathname: "/events?tab=today",
  },
  {
    name: "Esta semana",
    key: "this-week",
    pathname: "/events?tab=this-week",
  },
  {
    name: "Este mes",
    key: "this-month",
    pathname: "/events?tab=this-month",
  },
  {
    name: "Siguiente mes",
    key: "next-month",
    pathname: "/events?tab=next-month",
  },
];

interface Props {
  tab: string;
}
export function EventsTabs({ tab }: Props) {
  return (
    <nav className="space-x-1 flex overflow-x-auto no-scrollbar mb-8">
      {tabs.map((cTab) => {
        const isTabActive = cTab.key === tab;

        return (
          <Link href={`/events?tab=${cTab.key}`} key={cTab.key}>
            <button
              className={cn(
                "py-2 px-4 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-cyan-500/50 hover:text-cyan-800 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 transition-all active:scale-95 text-nowrap",
                isTabActive &&
                  "bg-cyan-500/50 dark:bg-cyan-500/50 text-cyan-800 dark:text-white/70"
              )}
            >
              {cTab.name}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
