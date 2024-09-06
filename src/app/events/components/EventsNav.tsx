"use client";

import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { DEFAULT_TAB } from "../constants";

interface Tab {
  name: string;
  key: string;
}
const tabs: Tab[] = [
  {
    name: "Todos",
    key: "all",
  },
  {
    name: "Hoy",
    key: "today",
  },
  {
    name: "Esta semana",
    key: "thisWeek",
  },
  {
    name: "Este mes",
    key: "thisMonth",
  },
];

export function EventsTab() {
  const [tab, setTab] = useQueryState("tab", { shallow: false });

  return (
    <nav className="space-x-1">
      {tabs.map((itemTab) => {
        const isTabActive = itemTab.key === (tab || DEFAULT_TAB);
        return (
          <button
            key={itemTab.key}
            className={cn(
              "py-2 px-4 bg-gray-200/80 hover:bbg-cyan-500/50 hover:text-cyan-800 rounded-full text-sm font-medium text-gray-500 transition-all active:scale-95",
              isTabActive && "bg-cyan-500/50 text-cyan-800"
            )}
            onClick={() => {
              if (isTabActive) return;
              setTab(itemTab.key);
            }}
          >
            {itemTab.name}
          </button>
        );
      })}
    </nav>
  );
}
