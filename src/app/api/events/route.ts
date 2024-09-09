import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function getJustDate(date: Date) {
  const stringDate = date.toISOString();
  return stringDate.split("T")[0];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const tab = searchParams.get("tab");
    const today = new Date();

    console.log("request to supabase", {
      searchParams: searchParams.toString(),
    });

    let client = supabase.from("events").select("*");

    if (tab === "today") {
      client = client.lte("start_date", getJustDate(today));
      client = client.gte("end_date", getJustDate(today));
      console.log({
        start_date: getJustDate(today),
        end_date: getJustDate(today),
      });
    }

    if (tab === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      client = client.lte("start_date", getJustDate(tomorrow));
      client = client.gte("end_date", getJustDate(tomorrow));

      console.log({
        start_date: getJustDate(tomorrow),
        end_date: getJustDate(tomorrow),
      });
    }

    if (tab === "this_week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
      ); // Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

      client = client
        .lte("start_date", getJustDate(endOfWeek))
        .gte("end_date", getJustDate(startOfWeek));

      console.log({
        start_date_lte: getJustDate(endOfWeek),
        end_date_gte: getJustDate(startOfWeek),
      });
    }

    if (tab === "next_week") {
      const today = new Date();
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + (7 - today.getDay() + 1)); // Next Monday
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 6); // Next Sunday

      client = client
        .lte("start_date", getJustDate(nextWeekEnd))
        .gte("end_date", getJustDate(nextWeekStart));

      console.log({
        start_date_lte: getJustDate(nextWeekEnd),
        end_date_gte: getJustDate(nextWeekStart),
      });
    }

    if (tab === "this_month") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      client = client
        .lte("start_date", getJustDate(endOfMonth))
        .gte("end_date", getJustDate(startOfMonth));

      console.log({
        start_date_lte: getJustDate(endOfMonth),
        end_date_gte: getJustDate(startOfMonth),
      });
    }

    if (tab === "next_month") {
      const startOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
      );
      const endOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0
      );

      client = client
        .lte("start_date", getJustDate(endOfNextMonth))
        .gte("end_date", getJustDate(startOfNextMonth));

      console.log({
        start_date_lte: getJustDate(endOfNextMonth),
        end_date_gte: getJustDate(startOfNextMonth),
      });
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

    const { data } = await client
      .order("start_date", { ascending: true })
      .order("name", { ascending: false });

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ ok: false });
  }
}
