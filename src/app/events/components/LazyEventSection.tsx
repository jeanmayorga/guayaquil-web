"use client";

import { useEffect, useState } from "react";

import { useObserver } from "@/hooks/useObserver";
import { getEvents } from "../actions";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { EventItemSkeleton } from "./EventItemSkeleton";

interface Props {
  sectionKey: string;
  label: string;
  limit: number;
}

export function LazyEventSection({ sectionKey, label, limit }: Props) {
  // Carga cuando la sección está por entrar al viewport (150px antes).
  const { ref, isIntersecting } = useObserver({
    rootMargin: "150px",
    freezeOnceVisible: true,
  });

  const [events, setEvents] = useState<EventType[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isIntersecting || events !== null || loading) return;
    setLoading(true);
    getEvents({ tab: sectionKey, limit })
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [isIntersecting, events, loading, sectionKey, limit]);

  const isEmpty = events !== null && events.length === 0;

  return (
    <section id={sectionKey} ref={ref} className="scroll-mt-20">
      <h2 className="text-lg font-semibold tracking-tight mb-4">{label}</h2>

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">No hay eventos por ahora.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events
            ? events.map((event, idx) => (
                <EventItem key={event.slug} event={event} idx={idx} />
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <EventItemSkeleton key={i} />
              ))}
        </div>
      )}
    </section>
  );
}
