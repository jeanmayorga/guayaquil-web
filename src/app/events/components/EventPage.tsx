"use client";

import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { useEffect, useRef, useState } from "react";
import { getEvents } from "../services";
import { EventItemSkeleton } from "./EventItemSkeleton";
import { DEFAULT_EVENTS_LIMIT } from "../utils";

interface Props {
  events: EventType[];
  tab: string;
}
export function EventPage(props: Props) {
  const containerRef = useRef(null);
  const [events, setEvents] = useState<EventType[]>(props.events);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadMoreEvents() {
      if (!loading && hasMore) {
        setLoading(true);
        const newPage = page + 1;
        const newEvents = await getEvents({
          tab: props.tab,
          limit: DEFAULT_EVENTS_LIMIT,
          page: newPage,
        });
        setEvents((currentEvents) => [...currentEvents, ...newEvents]);
        setPage(newPage);
        setLoading(false);
        if (newEvents.length !== DEFAULT_EVENTS_LIMIT) setHasMore(false);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMoreEvents();
        }
      },
      {
        rootMargin: "10px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, page, loading]);

  return (
    <>
      <section className="my-8">
        <span className="text-gray-400 text-xs flex items-center">
          {!events || events?.length === 0 ? (
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
              }).format(new Date(events[0]?.last_updated))}
            </>
          )}
        </span>
      </section>
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
        {props.events.length === DEFAULT_EVENTS_LIMIT && (
          <div ref={containerRef} />
        )}
      </section>
    </>
  );
}
