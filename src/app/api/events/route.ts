import { TZDate } from "@date-fns/tz";
import {
  add,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfDay,
  isWithinInterval,
  differenceInDays,
  differenceInHours,
  isPast,
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
          client = client.lte("start_at", todayISO).gte("end_at", todayISO);
        }

        if (tab === "tomorrow") {
          const tomorrow = add(ecuadorDate, { days: 1 });
          const startOfDayISO = startOfDay(tomorrow).toISOString();
          const endOfDayISO = endOfDay(tomorrow).toISOString();

          client = client
            .gte("start_at", startOfDayISO)
            .lte("end_at", endOfDayISO);
        }

        if (tab === "this_week") {
          const startOfWeekISO = startOfWeek(ecuadorDate).toISOString();
          const endOfWeekISO = endOfWeek(ecuadorDate, {
            weekStartsOn: 1,
          }).toISOString();

          client = client
            .gte("start_at", startOfWeekISO)
            .lte("end_at", endOfWeekISO);
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
          client = client.order("start_at", { ascending: true });
        } else {
          client = client
            .order("start_at", { ascending: true })
            .order("name", { ascending: false });
        }

        const result = await client;
        const events = result.data || [];

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
        return events;
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
