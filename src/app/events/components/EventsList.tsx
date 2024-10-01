import { CheckCircle, ExclamationCircle } from "@/components/icons";
import { getEvents } from "../services";
import { GetEventEventsOptions } from "../types";
import { EventsListItems } from "./EventsListItems";

interface Props {
  options: GetEventEventsOptions;
}
export async function EventsList({ options }: Props) {
  const response = await getEvents(options);

  const initialEvents = response.events;
  const initialLastUpdate = response.lastCacheUpdate;

  return (
    <>
      <section className="my-8">
        <span className="text-gray-400 text-xs flex items-center">
          {!initialEvents || initialEvents?.length === 0 ? (
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
              }).format(new Date(initialLastUpdate))}
            </>
          )}
        </span>
      </section>
      <EventsListItems initialEvents={initialEvents} />
    </>
  );
}
