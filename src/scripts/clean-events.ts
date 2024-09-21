import { TZDate } from "@date-fns/tz";
import { supabase } from "../lib/supabase";
import { startOfMonth, subMonths } from "date-fns";

export default async function main() {
  console.log("cleanEvents: start");

  const tzDate = new TZDate(new Date(), "America/Guayaquil");
  const startOfLastMonth = startOfMonth(subMonths(tzDate, 1));

  const data = await supabase
    .from("events")
    .select("*")
    .lte("end_at", startOfLastMonth.toISOString());

  if (data.error) {
    console.error("Error al get events:", data.error);
    return;
  }

  const ids = data.data.map((event) => {
    console.log(
      "cleanEvents",
      event.slug,
      event.end_at,
      startOfLastMonth.toISOString()
    );
    return event.id;
  });

  await supabase.from("events").delete().in("id", ids);

  console.log(`cleanEvents: ${data.data.length} events found and deleted`);
}
