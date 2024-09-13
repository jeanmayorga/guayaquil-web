import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getEvents } from "@/app/events/services";

export async function GET() {
  try {
    const getData = unstable_cache(
      async () => {
        const past = await getEvents({ tab: "past", limit: 100, page: 1 });
        const all = await getEvents({ tab: "all", limit: 100, page: 1 });
        const today = await getEvents({ tab: "today", limit: 100, page: 1 });
        const thisWeek = await getEvents({
          tab: "this_week",
          limit: 100,
          page: 1,
        });
        const thisMonth = await getEvents({
          tab: "this_month",
          limit: 100,
          page: 1,
        });
        const nextMonth = await getEvents({
          tab: "next_month",
          limit: 100,
          page: 1,
        });
        return {
          lastUpdate: all[0].last_updated,
          past,
          all,
          today,
          thisWeek,
          thisMonth,
          nextMonth,
        };
      },
      [],
      { revalidate: false, tags: ["events"] }
    );

    const data = await getData();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
