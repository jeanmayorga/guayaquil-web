"use client";

import { useMemo, useState } from "react";
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
import { EventItem } from "./EventItem";
import { EventType } from "../types";

export interface TimelineSection {
  key: string;
  label: string;
  events: EventType[];
}

export function EventsTimeline({ sections }: { sections: TimelineSection[] }) {
  const [query, setQuery] = useState("");

  // Filtra por nombre en el cliente, sobre las secciones ya renderizadas.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? sections.map((s) => ({
          ...s,
          events: s.events.filter((e) => e.name.toLowerCase().includes(q)),
        }))
      : sections;
    return filtered.filter((s) => s.events.length > 0);
  }, [query, sections]);

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

      {visible.length === 0 ? (
        <Empty className="mb-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX2 />
            </EmptyMedia>
            <EmptyTitle>Sin resultados</EmptyTitle>
            <EmptyDescription>
              {query
                ? `No encontramos eventos para “${query}”.`
                : "No hay eventos por ahora."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-12">
          {visible.map((section) => (
            <section
              key={section.key}
              id={section.key}
              className="scroll-mt-20"
            >
              <h2 className="text-lg font-semibold tracking-tight mb-4">
                {section.label}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {section.events.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {section.events.map((event, idx) => (
                  <EventItem key={event.slug} event={event} idx={idx} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
