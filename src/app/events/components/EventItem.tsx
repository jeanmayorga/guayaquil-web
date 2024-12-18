"use client";

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
  endOfDay,
  format,
  isPast,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { TZDate } from "@date-fns/tz";
import { es } from "date-fns/locale/es";
import { CountdownText } from "./CountdownText";
import { Badge } from "@/components/badge";
import { Link } from "next-view-transitions";
import { EventNewBadge } from "./EventNewBadge";

interface DurationBadgeProps {
  startAt: string;
  endAt: string;
}
export function DurationBadge({ startAt, endAt }: DurationBadgeProps) {
  if (!startAt || !endAt) return null;
  const daysOfDifference = differenceInDays(endAt, startAt);
  const hoursOfDifference = differenceInHours(endAt, startAt);

  const today = new TZDate(new Date(), "America/Guayaquil");
  const isPastEvent = isPast(endAt);
  const durationWord = isPastEvent ? "Duró" : "Dura";

  const isToday = isWithinInterval(today, {
    start: startOfDay(startAt),
    end: endOfDay(endAt),
  });

  if (isToday) {
    return <CountdownText startAt={startAt} endAt={endAt} today={today} />;
  }

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
  startAt: string;
  endAt: string;
}
export function TodayBadge({ startAt, endAt }: TodayBadgeProps) {
  if (!startAt || !endAt) return null;
  const isPastEvent = isPast(endAt);
  const today = new TZDate(new Date(), "America/Guayaquil");
  if (isPastEvent) return null;

  const isToday = isWithinInterval(today, {
    start: startOfDay(startAt),
    end: endOfDay(endAt),
  });

  if (isToday) {
    return (
      <Badge active>
        <CheckBadgeIcon className="w-4 h-4" />
        Hoy
      </Badge>
    );
  }

  const isTomorrow = isWithinInterval(addDays(today, 1), {
    start: startOfDay(startAt),
    end: endOfDay(endAt),
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
export function EndedBadge({ endAt }: EndedBadgeProps) {
  if (!endAt) return null;
  const isPastEvent = isPast(endAt);

  if (!isPastEvent) return null;

  return (
    <Badge>
      <NoSymbolIcon className="w-3 h-3" />
      Ya se terminó
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
      const date1 = format(startAt, "d 'de' LLL", { locale: es });
      const date2 = format(endAt, "d 'de' LLL", { locale: es });
      const time1 = format(startAt, "H:mm bbbb", { locale: es });

      return `${date1} hasta ${date2}, ${time1}`;
    }
    return format(startAt, "d 'de' LLLL 'del' yyyy H:mm bbbb", { locale: es });
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
  idx: number;
}
export function EventItem({ event, className, idx }: Props) {
  const today = new TZDate(new Date(), "America/Guayaquil");
  const startAt = event.start_at;
  const endAt = event.end_at;
  const createdAt = event.created_at;

  const isPastEvent = isPast(endAt);

  function handleLinkClick() {
    const scrollY = window.scrollY;
    localStorage.setItem("scrollPosition", scrollY.toString());
  }

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        "w-full flex-none rounded-2xl group transition-all relative",
        className
      )}
      onClick={handleLinkClick}
    >
      <div
        className="relative z-10 overflow-hidden bg-black flex items-center justify-center h-[200px] rounded-xl"
        style={{ viewTransitionName: `event-image-${event.slug}` }}
      >
        <Image
          src={event.cover_image}
          alt={event.name}
          height={190}
          width={250}
          quality={40}
          className="w-full group-hover:scale-[1.02] transition-all opacity-0"
          onLoad={(event) => {
            const image = event.target as HTMLElement;
            setTimeout(() => {
              image.classList.remove("opacity-0");
            }, idx * 30);
          }}
        />
        <div
          className={cn(
            "absolute z-10 top-0 left-0 w-full h-full bg-black/10 group-hover:bg-white/20 transition-all",
            isPastEvent && "bg-black/70 group-hover:bg-gray/30"
          )}
        />
        <div className={cn("absolute bottom-2 left-2")}>
          <div className="flex overflow-x-auto gap-2">
            <EventNewBadge createdAt={createdAt} />
            <TodayBadge startAt={startAt} endAt={endAt} />
            <DurationBadge startAt={startAt} endAt={endAt} />
            <EndedBadge endAt={endAt} />
          </div>
        </div>
      </div>
      <div className="py-4 pb-2">
        <div
          className="font-medium text-lg truncate dark:text-white/90 text-gray-600 group-hover:text-gray-950 dark:group-hover:text-white transition-all"
          style={{ viewTransitionName: `event-name-${event.slug}` }}
        >
          {event.name}
        </div>
        <div className="flex items-center text-gray-400 group-hover:text-gray-500 text-xs gap-2 transition-all mb-1 truncate">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          {event.location_name}
        </div>
        <DateText startAt={startAt} endAt={endAt} />
        <PriceText tickets={event.tickets} />
      </div>
      <div
        className={cn(
          "absolute z-0 top-0 left-0 w-full h-full rounded-2xl bg-cyan-500/15 dark:bg-cyan-500/20 opacity-0 group-hover:opacity-100 group-hover:scale-[1.05] group-active:bg-cyan-500/20 transition-all",
          isPastEvent &&
            "bg-gray-500/15 group-active:bg-gray-500/20 dark:bg-gray-500/20 dark:group-active:bg-gray-500/20"
        )}
      />
    </Link>
  );
}
