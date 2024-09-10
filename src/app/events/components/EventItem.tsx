import { CalendarIcon } from "@/components/icons";
import { EventType } from "../types";
import { cn } from "@/lib/utils";
import { EventDateFormat } from "./EventDateFormat";

interface Props {
  event: EventType;
  className?: string;
}
export function EventItem({ event, className }: Props) {
  const today = new Date();
  const todayDateWithoutTime = today.toISOString().split("T")[0];
  const startDate = event.start_date;
  const endDate = event.end_date;
  const isPastEvent = today > new Date(endDate);
  const isUniqueDateEvent = startDate === endDate;

  let isTodayEvent = false;

  if (isUniqueDateEvent && endDate === todayDateWithoutTime) {
    isTodayEvent = true;
  }
  if (
    !isUniqueDateEvent &&
    today > new Date(startDate) &&
    today < new Date(endDate)
  ) {
    isTodayEvent = true;
  }

  return (
    <a
      href={event.url}
      target="_blank"
      className={cn(
        "w-full flex-none rounded-2xl group transition-all relative",
        className
      )}
    >
      <div
        className="relative z-10 overflow-hidden bg-black flex items-center justify-center h-[200px] rounded-xl"
        style={{ viewTransitionName: `event-image-${event.slug}` }}
      >
        <img
          src={event.cover_image}
          alt={event.name}
          className="w-full group-hover:scale-[1.02] transition-all"
        />
        <div
          className={cn(
            "absolute z-10 top-0 left-0 w-full h-full bg-black/10 group-hover:bg-white/20 transition-all",
            isPastEvent && "bg-black/50 group-hover:bg-gray/20"
          )}
        />
        <div
          className={cn(
            "hidden absolute top-2 left-2 px-3 py-1 bg-black/50 text-white z-20 text-xs rounded-full font-medium",
            isPastEvent && "block bg-black/50 text-white",
            isTodayEvent && "block bg-cyan-500/70 text-white"
          )}
        >
          {isPastEvent && "Evento terminado"}
          {isTodayEvent && "Hoy"}
        </div>
      </div>
      <div className="py-4 pb-2">
        <div
          className={cn(
            "flex items-center text-cyan-500 group-hover:text-cyan-600 font-medium mb-1 text-xs gap-2 transition-all",
            isPastEvent && "text-gray-500 group-hover:text-gray-600"
          )}
          style={{ viewTransitionName: `event-calendar-${event.slug}` }}
        >
          <CalendarIcon />
          <EventDateFormat
            startDate={event.start_date}
            endDate={event.end_date}
          />
        </div>
        <div
          className="font-medium text-lg truncate text-gray-600 group-hover:text-gray-950 transition-all"
          style={{ viewTransitionName: `event-name-${event.slug}` }}
        >
          {event.name}
        </div>
        <div
          className="flex items-center text-gray-400 group-hover:text-gray-500 text-sm transition-all"
          style={{ viewTransitionName: `event-location-${event.slug}` }}
        >
          {event.location_name}
        </div>
      </div>
      <div
        className={cn(
          "absolute z-0 top-0 left-0 w-full h-full rounded-2xl bg-cyan-500/15 opacity-0 group-hover:opacity-100 group-hover:scale-[1.05] group-active:bg-cyan-500/20 transition-all",
          isPastEvent && "bg-gray-500/15 group-active:bg-gray-500/20"
        )}
      />
    </a>
  );
}
