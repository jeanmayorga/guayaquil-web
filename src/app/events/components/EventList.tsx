"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { EventListSkeleton } from "./EventListSkeleton";
import { BackButton } from "@/components/back-button";
import { Title } from "@/components/title";
import { EventsSearch } from "./EventsSearch";
import { EventsTab } from "./EventsNav";

function EventsList() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      let client = supabase.from("events").select("*");
      const search = searchParams.get("search");
      if (search) {
        client = client.ilike("name", `%${search}%`);
      }
      const { data } = await client.order("start_date", { ascending: true });
      setEvents(data as EventType[]);
      setLoading(false);
    };
    fetchEvents();
  }, [searchParams]);

  if (loading) return <EventListSkeleton />;

  return (
    <>
      <BackButton />
      <Title title="Shows en Guayaquil" />
      <EventsSearch />
      <EventsTab />
      <section className="my-8 flex justify-center items-center">
        <span className="text-gray-400 text-xs flex items-center">
          {events.length === 0 ? (
            <>
              <ExclamationCircle className="w-4 h-4 mr-1" />
              No hay shows o eventos.
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-1" />
              Actualizado{" "}
              {new Date(events[0]?.last_updated).toLocaleDateString("es-EC", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}
        </span>
      </section>
      <section>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {events.map((event) => (
            <EventItem event={event} key={event.slug} />
          ))}
        </div>
      </section>
    </>
  );
}

export default EventsList;
