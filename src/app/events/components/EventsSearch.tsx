"use client";
import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState } from "react";

export function EventsSearch() {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 1000,
    defaultValue: "",
    clearOnDefault: true,
  });

  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <section className="relative mb-4 rounded-xl">
      <SearchIcon className="h-5 w-5 absolute top-1/2 -translate-y-1/2 text-gray-500 left-3" />
      <Input
        placeholder="Buscar shows o eventos"
        className={cn(
          isSearching ? "w-[calc(100%-80px)]" : "w-full",
          "bg-gray-100 rounded-xl pl-11 text-gray-500 placeholder:text-gray-400 text-base border-0 transition-all duration-300"
        )}
        onFocus={() => setIsSearching(true)}
        onChange={(e) => setSearch(e.target.value)}
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
