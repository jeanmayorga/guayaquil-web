"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useObserver } from "@/hooks/useObserver";
import { navLock } from "@/hooks/useTimelineNav";
import { getEvents } from "../actions";
import { EventType } from "../types";
import { PAGE_SIZE } from "../sections";
import { EventItem } from "./EventItem";
import { EventItemSkeleton } from "./EventItemSkeleton";

interface Props {
  sectionKey: string;
  label: string;
  /** Primer lote, renderizado en el server (SSR). */
  initialEvents?: EventType[];
}

export function LazyEventSection({
  sectionKey,
  label,
  initialEvents = [],
}: Props) {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  // Si el primer lote vino completo, puede haber más.
  const [hasMore, setHasMore] = useState(initialEvents.length === PAGE_SIZE);
  // El primer lote ya está (SSR), así que el scroll infinito sigue desde 2.
  const nextPage = useRef(initialEvents.length > 0 ? 2 : 1);

  // El centinela dispara la carga al acercarse. Solo precarga hacia ABAJO
  // (margen inferior); así un salto a una sección no carga las de arriba.
  const { ref, isIntersecting } = useObserver({
    rootMargin: "0px 0px 200px 0px",
  });

  const loadMore = useCallback(async () => {
    setLoading(true);
    const page = nextPage.current;
    try {
      const data = await getEvents({ tab: sectionKey, page, limit: PAGE_SIZE });
      setEvents((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
      nextPage.current = page + 1;
    } finally {
      setLoading(false);
    }
  }, [sectionKey]);

  useEffect(() => {
    if (!isIntersecting || loading || !hasMore) return;
    // Si hay un salto en curso a otra sección, no cargar esta.
    if (navLock.key && navLock.key !== sectionKey) return;
    loadMore();
  }, [isIntersecting, loading, hasMore, loadMore, sectionKey]);

  return (
    <section id={sectionKey} className="scroll-mt-20">
      <h2 className="text-lg font-semibold tracking-tight mb-4">{label}</h2>

      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay eventos por ahora.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, idx) => (
            <EventItem key={event.slug} event={event} idx={idx % PAGE_SIZE} />
          ))}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <EventItemSkeleton key={`more-${i}`} />
            ))}
        </div>
      )}

      {hasMore && <div ref={ref} aria-hidden className="h-px w-full" />}
    </section>
  );
}
