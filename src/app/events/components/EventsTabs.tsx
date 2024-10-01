"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { DEFAULT_EVENTS_TAB } from "../utils";

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

export function EventsTabs() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || DEFAULT_EVENTS_TAB;

  return (
    <nav className="space-x-1 flex overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isTabActive = tab.key === currentTab;

        return (
          <Link href={`/events?tab=${tab.key}`} key={tab.key}>
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
