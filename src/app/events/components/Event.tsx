import { CalendarIcon } from "@/components/icons";
import { EventType } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  event: EventType;
  fullWidth?: boolean;
}
export function Event({ event, fullWidth }: Props) {
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      key={event.slug}
      className={cn(
        fullWidth ? "w-full" : "w-80",
        "flex-none border border-gray-200 rounded-2xl overflow-hidden hover:bg-slate-100 transition-all"
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
        <img src={event.cover_image} alt={event.name} className="w-full" />
      </div>
      <div className="p-4">
        <div className="flex items-center text-violet-700 font-medium mb-2 text-sm gap-2">
          <CalendarIcon />
          {event.start_date === event.end_date ? (
            new Date(event.start_date).toLocaleDateString("es-LA", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <>
              {new Date(event.start_date).toLocaleDateString("es-LA", {
                day: "2-digit",
                month: "long",
              })}{" "}
              hasta{" "}
              {new Date(event.end_date).toLocaleDateString("es-LA", {
                day: "2-digit",
                month: "long",
              })}
            </>
          )}
        </div>
        <div className="font-semibold text-lg truncate">{event.name}</div>
        <div className="flex items-center text-gray-700 text-sm">
          {event.location_name}
        </div>
      </div>
    </a>
  );
}
