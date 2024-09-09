import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { EventType } from "../types";
import { EventItem } from "./EventItem";

interface Props {
  events: EventType[];
}
export function EventPage({ events }: Props) {
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
        </div>
      </section>
    </>
  );
}
