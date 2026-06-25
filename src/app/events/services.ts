"use server";

import { TZDate } from "@date-fns/tz";
import { supabase } from "@/lib/supabase";
import { EventType, GetEventSearchParams } from "./types";

export interface GetEventResult {
  event: EventType | null;
  lastCacheUpdate: string;
}

// Consulta Supabase directamente (sin pasar por /api/event), para que el
// detalle se pueda prerenderizar en build + ISR sin self-fetch.
export async function getEvent(
  options: GetEventSearchParams
): Promise<GetEventResult> {
  const { slug } = options;

  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  const lastCacheUpdate = new TZDate(
    new Date(),
    "America/Guayaquil"
  ).toISOString();

  return { event: (data as EventType) ?? null, lastCacheUpdate };
}
