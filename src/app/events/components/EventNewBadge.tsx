"use client";

import { Badge } from "@/components/badge";
import { TZDate } from "@date-fns/tz";
import { differenceInDays } from "date-fns";

interface EventNewBadgeProps {
  createdAt: string;
}
export function EventNewBadge({ createdAt }: EventNewBadgeProps) {
  if (!createdAt) return null;

  const today = new TZDate(new Date(), "America/Guayaquil");
  const createdAtEcuadorTime = new TZDate(createdAt, "America/Guayaquil");
  const days = differenceInDays(today, createdAtEcuadorTime);

  if (days > 2) return null;

  return <Badge active>Nuevo</Badge>;
}
