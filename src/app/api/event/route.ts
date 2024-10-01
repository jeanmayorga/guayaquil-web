import { TZDate } from "@date-fns/tz";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");

    const getData = unstable_cache(
      async () => {
        const client = supabase.from("events").select("*").eq("slug", slug);
        const todayISO = new TZDate(
          new Date(),
          "America/Guayaquil"
        ).toISOString();

        const result = await client.single();

        const response = {
          lastCacheUpdate: todayISO,
          event: result.data,
        };

        const searchParamsClient = (client.geojson() as any).url.searchParams;
        console.log(`Supabase ->`, searchParams, searchParamsClient);
        return response;
      },
      [String(slug)],
      { revalidate: false, tags: ["events", String(slug)] }
    );

    const data = await getData();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({
      lastCacheUpdate: null,
      event: null,
    });
  }
}
