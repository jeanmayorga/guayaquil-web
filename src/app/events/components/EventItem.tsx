import {
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon,
  NoSymbolIcon,
  PriceIcon,
} from "@/components/icons";
import { EventType } from "../types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  addDays,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  format,
  isPast,
  isWithinInterval,
} from "date-fns";
import { TZDate } from "@date-fns/tz";
import locale from "date-fns/locale/es";

interface BadgeProps {
  children?: React.ReactNode;
  active?: boolean;
}
function Badge({ children, active }: BadgeProps) {
  return (
    <div
      className={cn(
        "px-3 py-1 z-20 text-xs rounded-full bg-black/80 text-white flex items-center gap-1",
        active && "bg-cyan-500/70 text-white"
      )}
    >
      {children}
    </div>
  );
}

interface DurationBadgeProps {
  startAt: string;
  endAt: string;
}
function DurationBadge({ startAt, endAt }: DurationBadgeProps) {
  const daysOfDifference = differenceInDays(endAt, startAt);
  const hoursOfDifference = differenceInHours(endAt, startAt);

  const isPastEvent = isPast(endAt);
  const durationWord = isPastEvent ? "Duró" : "Dura";

  if (daysOfDifference >= 30) {
    const monthsOfDifference = differenceInMonths(endAt, startAt);
    const monthsWord = monthsOfDifference === 1 ? "mes" : "meses";

    return (
      <Badge>
        <ClockIcon className="w-4 h-4" />
        {durationWord} {monthsOfDifference} {monthsWord}{" "}
      </Badge>
    );
  }

  if (daysOfDifference >= 1) {
    const daysWord = daysOfDifference === 1 ? "día" : "días";

    return (
      <Badge>
        <ClockIcon className="w-4 h-4" />
        {durationWord} {daysOfDifference} {daysWord}{" "}
      </Badge>
    );
  }

  if (hoursOfDifference > 0) {
    const hoursWord = hoursOfDifference === 1 ? "hora" : "horas";
    return (
      <Badge>
        <ClockIcon className="w-3 h-3" />
        {durationWord} {hoursOfDifference} {hoursWord}{" "}
      </Badge>
    );
  }

  return null;
}

interface TodayBadgeProps {
  today: Date;
  startAt: string;
  endAt: string;
}
function TodayBadge({ today, startAt, endAt }: TodayBadgeProps) {
  const isPastEvent = isPast(endAt);
  if (isPastEvent) return null;

  const isToday = isWithinInterval(today, { start: startAt, end: endAt });
  if (isToday) {
    return (
      <Badge active>
        <CheckBadgeIcon className="w-4 h-4" />
        Hoy
      </Badge>
    );
  }

  const isTomorrow = isWithinInterval(addDays(today, 1), {
    start: startAt,
    end: endAt,
  });
  if (isTomorrow) {
    return (
      <Badge active>
        <CheckBadgeIcon className="w-4 h-4" />
        Mañana
      </Badge>
    );
  }
  return null;
}
interface EndedBadgeProps {
  endAt: string;
}
function EndedBadge({ endAt }: EndedBadgeProps) {
  const isPastEvent = isPast(endAt);

  if (!isPastEvent) return null;

  return (
    <Badge>
      <NoSymbolIcon className="w-3 h-3" />
      Ya terminó
    </Badge>
  );
}

interface PriceTextProps {
  tickets: EventType["tickets"];
}
function PriceText({ tickets }: PriceTextProps) {
  if (!tickets || tickets.length === 0) return null;

  const lowerPrice = tickets.reduce(
    (min, ticket) => Math.min(min, ticket.price),
    Infinity
  );
  const higherPrice = tickets.reduce(
    (max, ticket) => Math.max(max, ticket.price),
    -Infinity
  );

  return (
    <div
      className={cn(
        "flex items-center font-medium mb-1 text-xs gap-2 transition-all text-gray-400 group-hover:text-gray-500 "
      )}
    >
      <PriceIcon className="w-4 h-4" />
      {lowerPrice === higherPrice ? (
        <>Desde {lowerPrice} USD</>
      ) : (
        <>
          Desde {lowerPrice} USD hasta {higherPrice} USD
        </>
      )}
    </div>
  );
}

interface DateTextProps {
  startAt: string;
  endAt: string;
}

export function DateText({ startAt, endAt }: DateTextProps) {
  const isPastEvent = isPast(endAt);
  const daysOfDifference = differenceInDays(endAt, startAt);

  function text() {
    if (daysOfDifference) {
      const date1 = format(startAt, "d 'de' LLLL", {
        locale,
      });
      const date2 = format(endAt, "d 'de' LLLL", {
        locale,
      });
      const time = format(startAt, "H:mm bbbb", {
        locale,
      });
      return `${date1} hasta ${date2}, ${time}`;
    }
    return format(startAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", {
      locale,
    });
  }
  return (
    <div
      className={cn(
        "flex items-center text-cyan-500 group-hover:text-cyan-600 font-medium mb-1 text-xs gap-2 transition-all",
        isPastEvent && "text-gray-500 group-hover:text-gray-600"
      )}
    >
      <CalendarIcon className="w-4 h-4" />
      {text()}
    </div>
  );
}

interface Props {
  event: EventType;
  className?: string;
}
export function EventItem({ event, className }: Props) {
  const today = new TZDate(new Date(), "America/Guayaquil");
  const startAt = event.start_at;
  const endAt = event.end_at;

  const isPastEvent = isPast(endAt);

  return (
    <a
      href={event.url}
      target="_blank"
      className={cn(
        "w-full flex-none rounded-2xl group transition-all relative",
        className
      )}
    >
      <div className="relative z-10 overflow-hidden bg-black flex items-center justify-center h-[200px] rounded-xl">
        <Image
          src={event.cover_image}
          alt={event.name}
          height={190}
          width={250}
          quality={40}
          className="w-full group-hover:scale-[1.02] transition-all"
        />
        <div
          className={cn(
            "absolute z-10 top-0 left-0 w-full h-full bg-black/10 group-hover:bg-white/20 transition-all",
            isPastEvent && "bg-black/70 group-hover:bg-gray/30"
          )}
        />
        <div className={cn("absolute bottom-2 left-2")}>
          <div className="flex overflow-x-auto gap-2">
            <TodayBadge startAt={startAt} endAt={endAt} today={today} />
            <DurationBadge startAt={startAt} endAt={endAt} />
            <EndedBadge endAt={endAt} />
          </div>
        </div>
      </div>
      <div className="py-4 pb-2">
        <div className="font-medium text-lg truncate text-gray-600 group-hover:text-gray-950 transition-all">
          {event.name}
        </div>
        <div className="flex items-center text-gray-400 group-hover:text-gray-500 text-xs gap-2 transition-all mb-1">
          <MapPin className="w-4 h-4" />
          {event.location_name}
        </div>
        <DateText startAt={startAt} endAt={endAt} />
        <PriceText tickets={event.tickets} />
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
