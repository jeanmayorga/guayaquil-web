"use client";

import { TZDate } from "@date-fns/tz";
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";

interface CountdownTextProps {
  startAt: string;
  today: Date;
}
export function CountdownText({ startAt, today }: CountdownTextProps) {
  const [eventStarted, setEventStarted] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const startDate = new Date(startAt);
      const now = new TZDate(new Date(), "America/Guayaquil");
      now.setFullYear(startDate.getFullYear());
      now.setMonth(startDate.getMonth());
      now.setDate(startDate.getDate());

      const hoursRemaining = differenceInHours(startDate, now);
      const minutesRemaining = differenceInMinutes(startDate, now) % 60;
      const secondsRemaining = differenceInSeconds(startDate, now) % 60;

      if (
        hoursRemaining <= 0 &&
        minutesRemaining <= 0 &&
        secondsRemaining <= 0
      ) {
        setEventStarted(true);
        clearInterval(interval);
      } else {
        setTimeRemaining({
          hours: Math.max(hoursRemaining, 0),
          minutes: Math.max(minutesRemaining, 0),
          seconds: Math.max(secondsRemaining, 0),
        });
        setEventStarted(false);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startAt]);

  function formatTime(time?: number, afix: string = "") {
    let timeString = String(time);

    if (timeString.length === 1) {
      timeString = timeString.padStart(2, "0");
    }

    return `${timeString}${afix}`;
  }

  if (eventStarted) {
    return <span>En curso</span>;
  }

  return (
    <span>
      Empieza en {formatTime(timeRemaining.hours, ":")}
      {formatTime(timeRemaining.minutes, ":")}
      {formatTime(timeRemaining.seconds)}
    </span>
  );
}