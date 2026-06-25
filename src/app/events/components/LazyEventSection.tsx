"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useObserver } from "@/hooks/useObserver";
import { getEvents } from "../actions";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { EventItemSkeleton } from "./EventItemSkeleton";

const PAGE_SIZE = 6;

interface Props {
  sectionKey: string;
  label: string;
}

export function LazyEventSection({ sectionKey, label }: Props) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const nextPage = useRef(1);

  // El centinela dispara la carga al acercarse: sirve para la carga inicial
  // de la sección y para ir trayendo más lotes a medida que se scrollea.
  const { ref, isIntersecting } = useObserver({ rootMargin: "300px" });

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
    if (isIntersecting && !loading && hasMore) {
      loadMore();
    }
  }, [isIntersecting, loading, hasMore, loadMore]);

  const showInitialSkeleton = events.length === 0 && hasMore;
  const isEmpty = events.length === 0 && !hasMore;

  return (
    <section id={sectionKey} className="scroll-mt-20">
      <h2 className="text-lg font-semibold tracking-tight mb-4">{label}</h2>

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">
          No hay eventos por ahora.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showInitialSkeleton
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <EventItemSkeleton key={`init-${i}`} />
              ))
            : events.map((event, idx) => (
                <EventItem
                  key={event.slug}
                  event={event}
                  idx={idx % PAGE_SIZE}
                />
              ))}
          {loading &&
            events.length > 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <EventItemSkeleton key={`more-${i}`} />
            ))}
        </div>
      )}

      {hasMore && <div ref={ref} aria-hidden className="h-px w-full" />}
    </section>
  );
}
