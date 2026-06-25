"use client";

import { cn } from "@/lib/utils";
import { useTimelineNav } from "@/hooks/useTimelineNav";

export function TimelineNav({ className }: { className?: string }) {
  const { items, active, go } = useTimelineNav();

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
