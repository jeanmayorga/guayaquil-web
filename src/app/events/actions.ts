import { TZDate } from "@date-fns/tz";
import {
  add,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfDay,
  StartOfWeekOptions,
} from "date-fns";
import { supabase } from "@/lib/supabase";
import { EventType } from "./types";

interface GetEventsOptions {
  query?: string;
  tab?: string;
  page?: number;
  limit?: number;
}
export async function getEvents({
  query,
  page = 1,
  limit = 10,
  tab,
}: GetEventsOptions): Promise<EventType[]> {
  const ecuadorDate = new TZDate(new Date(), "America/Guayaquil");
  const todayISO = ecuadorDate.toISOString();

  let client = supabase.from("events").select("*");

  if (tab === "past") {
    client = client.lt("end_at", todayISO);
  }

  if (tab === "all") {
    client = client.gte("end_at", todayISO);
  }

  if (tab === "today") {
    const startOfDayISO = startOfDay(ecuadorDate).toISOString();
    const endOfDayISO = endOfDay(ecuadorDate).toISOString();

    client = client
      .lte("start_at", endOfDayISO) // Eventos que empezaron antes o durante hoy
      .gte("end_at", startOfDayISO); // Eventos que terminan hoy o después
  }

  if (tab === "this-week") {
    const weekOptions: StartOfWeekOptions = {
      weekStartsOn: 1,
    };
    const startOfWeekISO = startOfWeek(ecuadorDate, weekOptions).toISOString();
    const endOfWeekISO = endOfWeek(ecuadorDate, weekOptions).toISOString();

    client = client.lte("start_at", endOfWeekISO).gte("end_at", startOfWeekISO);
  }

  if (tab === "this-month") {
    const startOfMonthISO = startOfMonth(ecuadorDate).toISOString();
    const endOfMonthISO = endOfMonth(ecuadorDate).toISOString();

    client = client
      .gte("start_at", startOfMonthISO)
      .lte("end_at", endOfMonthISO);
  }

  if (tab === "next-month") {
    const nextMonth = add(ecuadorDate, { months: 1 });
    const startOfNextMonthISO = startOfMonth(nextMonth).toISOString();
    const endOfMonthISO = endOfMonth(nextMonth).toISOString();

    client = client
      .gte("start_at", startOfNextMonthISO)
      .lte("end_at", endOfMonthISO);
  }

  if (query) {
    client = client.ilike("name", `%${query}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  client = client.range(from, to);

  if (tab === "past") {
    client = client.order("start_at", { ascending: false });
  } else {
    client = client
      .order("start_at", { ascending: true })
      .order("name", { ascending: false });
  }

  const { data, error } = await client;

  if (error || !data) return [];

  return data as EventType[];
}
