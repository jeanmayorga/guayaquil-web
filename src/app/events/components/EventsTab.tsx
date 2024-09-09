"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Tab {
  name: string;
  key: string;
}
const tabs: Tab[] = [
  {
    name: "Todos",
    key: "",
  },
  {
    name: "Pasados",
    key: "past",
  },
  {
    name: "Hoy",
    key: "today",
  },
  {
    name: "Mañana",
    key: "tomorrow",
  },
  {
    name: "Esta semana",
    key: "this_week",
  },
  {
    name: "Siguiente semana",
    key: "next_week",
  },
  {
    name: "Este mes",
    key: "this_month",
  },
  {
    name: "Siguiente mes",
    key: "next_month",
  },
];

export function EventTab() {
  const params = useParams();
  const tab = params.tab || "";

  return (
    <nav className="space-x-1 flex overflow-x-auto no-scrollbar">
      {tabs.map((itemTab) => {
        const isTabActive = itemTab.key === tab;
        return (
          <Link href={`/events/${itemTab.key}`} key={itemTab.key}>
            <button
              className={cn(
                "py-2 px-4 bg-gray-200/80 hover:bbg-cyan-500/50 hover:text-cyan-800 rounded-full text-sm font-medium text-gray-500 transition-all active:scale-95 text-nowrap",
                isTabActive && "bg-cyan-500/50 text-cyan-800"
              )}
            >
              {itemTab.name}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
