import { supabase } from "../lib/supabase";

export default async function main() {
  console.log("start clean events");

  const data = await supabase
    .from("events")
    .select("*")
    .lt("end_date", new Date().toISOString());

  if (data.error) {
    console.error("Error al get events:", data.error);
    return;
  }

  const ids = data.data.map((event) => event.id);

  await supabase.from("events").delete().in("id", ids);

  console.log(`${data.data.length} events found and deleted`);
}
