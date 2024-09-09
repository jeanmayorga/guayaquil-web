import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { EventType } from "../types";
import { EventItem } from "./EventItem";
import { BackButton } from "@/components/back-button";
import { Title } from "@/components/title";
import { Suspense } from "react";
import { EventSearch } from "./EventSearch";
import { EventTab } from "./EventsTab";

interface Props {
  events: EventType[];
}
export function EventPage({ events }: Props) {
  return (
    <>
      <BackButton />
      <Title title="Shows en Guayaquil" />

      <Suspense fallback={<>Cargando..</>}>
        <EventSearch />
      </Suspense>

      <EventTab />

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
              {new Date(events[0]?.last_updated).toLocaleDateString("es-EC", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZoneName: "long",
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
