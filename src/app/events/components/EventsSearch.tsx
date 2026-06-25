"use client";

import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useCallback, useState } from "react";

export function EventsSearch() {
  const [search, setSearch] = useQueryState("query", {
    shallow: false,
    throttleMs: 2000,
    defaultValue: "",
    clearOnDefault: true,
  });
  const [_tab, setTab] = useQueryState("tab");

  const doSearch = useCallback((query: string) => {
    setSearch(query);
    setTab("all");
  }, []);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <section className="relative mb-8 rounded-xl overflow-hidden">
      <SearchIcon className="h-5 w-5 absolute top-1/2 -translate-y-1/2 text-muted-foreground left-3.5 z-10" />
      <Input
        placeholder="Buscar shows o eventos"
        className={cn(
          isSearching ? "w-[calc(100%-80px)]" : "w-full",
          "h-12 rounded-xl border border-border bg-muted/40 pl-11 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:border-cyan-500 focus-visible:bg-background"
        )}
        onFocus={() => setIsSearching(true)}
        onChange={(e) => doSearch(e.target.value)}
        value={search || ""}
      />
      <span
        className={cn(
          isSearching ? "opacity-100 right-0" : "opacity-0 -right-[100px]",
          "text-cyan-500 hover:text-cyan-600 hover:scale-[.99] active:scale-[.97] transition-all top-0 flex items-center h-full absolute cursor-pointer select-none duration-300"
        )}
        onClick={() => {
          setSearch(null);
          setIsSearching(false);
        }}
      >
        Cancelar
      </span>
    </section>
  );
}
