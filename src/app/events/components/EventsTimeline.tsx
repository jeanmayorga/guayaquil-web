"use client";

import { useEffect, useState } from "react";
import { CalendarX2 } from "lucide-react";

import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getEvents } from "../actions";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { EventItemSkeleton } from "./EventItemSkeleton";
import { LazyEventSection } from "./LazyEventSection";
import { TimelineNav } from "./TimelineNav";

const SECTIONS: { key: string; label: string; limit: number }[] = [
  { key: "today", label: "Hoy", limit: 30 },
  { key: "this-week", label: "Esta semana", limit: 30 },
  { key: "this-month", label: "Este mes", limit: 30 },
  { key: "next-month", label: "Próximo mes", limit: 30 },
  { key: "past", label: "Pasados", limit: 12 },
];

export function EventsTimeline() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EventType[] | null>(null);
  const [searching, setSearching] = useState(false);

  // Búsqueda en el server (DB oculta), con debounce.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    const t = setTimeout(() => {
      getEvents({ query: q, limit: 60 })
        .then(setResults)
        .finally(() => setSearching(false));
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const isSearchingMode = query.trim().length > 0;

  return (
    <>
      <section className="relative mb-10 rounded-xl">
        <SearchIcon className="h-5 w-5 absolute top-1/2 -translate-y-1/2 text-muted-foreground left-3.5 z-10" />
        <Input
          placeholder="Buscar shows o eventos"
          className="h-12 w-full rounded-xl border border-border bg-muted/40 pl-11 text-base text-foreground placeholder:text-muted-foreground transition-all focus-visible:border-cyan-500 focus-visible:bg-background"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      {isSearchingMode ? (
        <SearchResults
          results={results}
          searching={searching}
          query={query.trim()}
        />
      ) : (
        <div className="flex gap-8">
          <TimelineNav className="sticky top-6 hidden h-fit w-44 flex-none self-start lg:flex" />
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            {SECTIONS.map((s) => (
              <LazyEventSection
                key={s.key}
                sectionKey={s.key}
                label={s.label}
                limit={s.limit}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SearchResults({
  results,
  searching,
  query,
}: {
  results: EventType[] | null;
  searching: boolean;
  query: string;
}) {
  if (searching && !results) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Empty className="mb-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarX2 />
          </EmptyMedia>
          <EmptyTitle>Sin resultados</EmptyTitle>
          <EmptyDescription>
            No encontramos eventos para “{query}”.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((event, idx) => (
        <EventItem key={event.slug} event={event} idx={idx} />
      ))}
    </div>
  );
}
