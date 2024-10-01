"use client";

import { EventTab, EventType } from "../types";
import { EventItem } from "./EventItem";
import { useEffect, useState } from "react";
import { getEvents } from "../services";
import { EventItemSkeleton } from "./EventItemSkeleton";
import { DEFAULT_EVENTS_LIMIT, DEFAULT_EVENTS_TAB } from "../utils";
import { useSearchParams } from "next/navigation";
import { useObserver } from "@/hooks/useObserver";

interface Props {
  initialEvents: EventType[];
}

export function EventsListItems({ initialEvents }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const tab = (searchParams.get("tab") || DEFAULT_EVENTS_TAB) as EventTab;

  const { isIntersecting, ref } = useObserver({
    threshold: 0.5,
  });

  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [wasSearching, setWasSearching] = useState(false);

  useEffect(() => {
    const searchLength = query?.length || 0;
    if (searchLength > 0) {
      setWasSearching(true);
    }
    if (wasSearching && searchLength === 0) {
      setLoading(false);
      setPage(1);
      setHasMore(true);
      setWasSearching(false);
    }
  }, [query, wasSearching]);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  useEffect(() => {
    async function loadMoreEvents() {
      setLoading(true);
      const newPage = page + 1;
      const response = await getEvents({
        tab: tab,
        limit: DEFAULT_EVENTS_LIMIT,
        query: query,
        page: newPage,
      });
      const newEvents = response.events;
      setEvents((currentEvents) => [...currentEvents, ...newEvents]);
      setPage(newPage);
      setLoading(false);
      if (newEvents.length !== DEFAULT_EVENTS_LIMIT) setHasMore(false);
    }

    if (
      isIntersecting &&
      !loading &&
      hasMore &&
      initialEvents.length >= DEFAULT_EVENTS_LIMIT
    ) {
      loadMoreEvents();
    }
  }, [
    hasMore,
    initialEvents.length,
    isIntersecting,
    loading,
    page,
    query,
    tab,
  ]);

  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {events.map((event) => (
          <EventItem event={event} key={event.slug} />
        ))}
        {loading &&
          [...Array(DEFAULT_EVENTS_LIMIT).keys()].map((item) => (
            <EventItemSkeleton key={item} />
          ))}
      </div>

      <div ref={ref} />
    </section>
  );
}
