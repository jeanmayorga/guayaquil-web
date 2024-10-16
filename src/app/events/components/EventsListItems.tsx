"use client";

import { EventTab, EventType } from "../types";
import { EventItem } from "./EventItem";
import { useEffect, useState } from "react";
import { getEvents } from "../services";
import { EventItemSkeleton } from "./EventItemSkeleton";
import { DEFAULT_EVENTS_LIMIT, DEFAULT_EVENTS_TAB } from "../utils";
import { useSearchParams } from "next/navigation";
import { useObserver } from "@/hooks/useObserver";
import { CheckCircle, ExclamationCircle } from "@/components/icons";

export function EventsListItems() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const tab = (searchParams.get("tab") || DEFAULT_EVENTS_TAB) as EventTab;

  const { isIntersecting, ref } = useObserver({
    threshold: 0.5,
  });

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [wasSearching, setWasSearching] = useState(false);
  const [lastCacheUpdate, setLastCacheUpdate] = useState<string>("");

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
      setLastCacheUpdate(response.lastCacheUpdate);
      setPage(newPage);
      setLoading(false);
      if (newEvents.length !== DEFAULT_EVENTS_LIMIT) setHasMore(false);
    }

    if (isIntersecting && !loading && hasMore) {
      loadMoreEvents();
      console.log("load more events");
    }
    console.log(isIntersecting, !loading, hasMore);
  }, [events.length, hasMore, isIntersecting, loading, page, query, tab]);

  useEffect(() => {
    async function loadInitialEvents() {
      setLoading(true);
      const response = await getEvents({
        tab: tab,
        limit: DEFAULT_EVENTS_LIMIT,
        query: query,
        page: 1,
      });
      const newEvents = response.events;
      setEvents(newEvents);
      setLastCacheUpdate(response.lastCacheUpdate);
      setPage(1);
      setLoading(false);
      if (newEvents.length !== DEFAULT_EVENTS_LIMIT) setHasMore(false);
    }

    loadInitialEvents();
  }, [query, tab]);

  useEffect(() => {
    setEvents([]);
    setLoading(true);
    setHasMore(true);
    setPage(1);
  }, [tab]);

  return (
    <section>
      <section className="my-8">
        <span className="text-gray-400 text-xs flex items-center">
          {events.length === 0 ? (
            <>
              <ExclamationCircle className="w-4 h-4 mr-1" />
              No hay shows o eventos.
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-1" />
              Ultima actualización{" "}
              {new Intl.DateTimeFormat("es-EC", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "America/Guayaquil",
              }).format(new Date(lastCacheUpdate))}
            </>
          )}
        </span>
      </section>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {events.map((event, idx) => (
          <EventItem event={event} key={event.slug} idx={idx} />
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
