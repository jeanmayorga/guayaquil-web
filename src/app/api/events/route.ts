import { TZDate } from "@date-fns/tz";
import {
  add,
  endOfWeek,
  Duration,
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

      client = client.gte("start_at", startOfDayISO).lte("end_at", endOfDayISO);
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

    const getData = unstable_cache(
      async () => {
        const { data } = await client;
        const searchParams = (client.geojson() as unknown as any).url
          .searchParams;

        console.log(`Request to supabase ->`, searchParams);

        return data || [];
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
