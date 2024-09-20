"use client";

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
      const now = new Date();
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

  if (eventStarted) {
    return <span>En curso</span>;
  }

  return (
    <span>
      Empieza en{" "}
      {timeRemaining.hours &&
        `${String(timeRemaining.hours).padStart(2, "0")}:`}
      {timeRemaining.minutes &&
        `${String(timeRemaining.minutes).padStart(2, "0")}:`}
      {timeRemaining.seconds &&
        `${String(timeRemaining.seconds).padStart(2, "0")}`}
    </span>
  );
}
