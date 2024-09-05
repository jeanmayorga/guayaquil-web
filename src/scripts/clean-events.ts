import { supabase } from "../lib/supabase";

export default async function main() {
  console.log("cleanEvents: start");

  const now = new Date();
  const ecuadorDate = new Date(now.getTime() - 5 * 60 * 60 * 1000);

  const data = await supabase
    .from("events")
    .select("*")
    .lt("end_date", ecuadorDate.toISOString());

  if (data.error) {
    console.error("Error al get events:", data.error);
    return;
  }

  const ids = data.data.map((event) => {
    console.log("cleanEvents", event);
    return event.id;
  });

  await supabase.from("events").delete().in("id", ids);

  console.log(`cleanEvents: ${data.data.length} events found and deleted`);
}
