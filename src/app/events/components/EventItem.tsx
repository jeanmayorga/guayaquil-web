import { CalendarIcon } from "@/components/icons";
import { EventType } from "../types";
import { cn } from "@/lib/utils";
import { EventDateFormat } from "../date-format";

interface Props {
  event: EventType;
}
export function EventItem({ event }: Props) {
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-full flex-none rounded-2xl overflow-hidden group transition-all"
      )}
    >
      <div className="relative overflow-hidden bg-black flex items-center justify-center h-[200px] rounded-xl">
        <img
          src={event.cover_image}
          alt={event.name}
          className="w-full group-hover:scale-[1.02] transition-all"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-white/20 transition-all" />
      </div>
      <div className="py-4">
        <div className="flex items-center text-cyan-500 group-hover:text-cyan-600 font-medium mb-1 text-xs gap-2 transition-all">
          <CalendarIcon />
          <EventDateFormat
            startDate={event.start_date}
            endDate={event.end_date}
          />
        </div>
        <div className="font-medium text-lg truncate text-gray-600 group-hover:text-gray-950 transition-all">
          {event.name}
        </div>
        <div className="flex items-center text-gray-400 group-hover:text-gray-500 text-sm transition-all">
          {event.location_name}
        </div>
      </div>
    </a>
  );
}
