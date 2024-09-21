import { TZDate } from "@date-fns/tz";
import {
  add,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const tab = searchParams.get("tab");

    const getData = unstable_cache(
      async () => {
        let client = supabase.from("events").select("*");

        const ecuadorDate = new TZDate(new Date(), "America/Guayaquil");
        const todayISO = ecuadorDate.toISOString();

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

        if (tab === "this_week") {
          const startOfWeekISO = startOfWeek(ecuadorDate, {
            weekStartsOn: 1,
          }).toISOString();
          const endOfWeekISO = endOfWeek(ecuadorDate, {
            weekStartsOn: 1,
          }).toISOString();

          client = client
            .lte("start_at", endOfWeekISO)
            .gte("end_at", startOfWeekISO);
        }

        if (tab === "this_month") {
          const startOfMonthISO = startOfMonth(ecuadorDate).toISOString();
          const endOfMonthISO = endOfMonth(ecuadorDate).toISOString();

          client = client
            .gte("start_at", startOfMonthISO)
            .lte("end_at", endOfMonthISO);
        }

        if (tab === "next_month") {
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

        if (page || limit) {
          const pageParsed = Number(searchParams.get("page") || 1);
          const limitParsed = Number(searchParams.get("limit") || 100);
          const from = (pageParsed - 1) * limitParsed;
          const to = from + limitParsed - 1;

          client = client.range(from, to);
        }

        if (tab === "past") {
          client = client.order("start_at", { ascending: false });
        } else {
          client = client
            .order("start_at", { ascending: true })
            .order("name", { ascending: false });
        }

        const result = await client;
        const events = result.data || [];

        const lastEventUpdateEvent = events.reduce((latest, current) => {
          return new Date(current.last_updated) > new Date(latest.last_updated)
            ? current
            : latest;
        }, events[0]);

        const response = {
          lastCacheUpdate: todayISO,
          lastEventUpdate: new TZDate(
            lastEventUpdateEvent.last_updated,
            "America/Guayaquil"
          ),
          events,
        };

        // const eventsMapped = events.map((event) => {
        //   const startAt = event.start_at;
        //   const endAt = event.end_at;
        //   const isToday = isWithinInterval(ecuadorDate, {
        //     start: startAt,
        //     end: endAt,
        //   });
        //   const daysOfDifference = differenceInDays(endAt, startAt);
        //   const hoursOfDifference = differenceInHours(endAt, startAt);
        //   const hasDateRange = daysOfDifference > 1;
        //   const isPastEvent = isPast(endAt);

        //   return {
        //     ...event,
        //     dateOptions: {
        //       isToday,
        //       isPastEvent,
        //       daysOfDifference,
        //       hoursOfDifference,
        //       hasDateRange,
        //     },
        //   };
        // });

        const searchParamsClient = (client.geojson() as any).url.searchParams;
        console.log(`Supabase ->`, searchParams, searchParamsClient);
        return response;
      },
      [String(tab), String(page), String(limit), String(query)],
      { revalidate: false, tags: ["events"] }
    );

    const data = await getData();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json([]);
  }
}
