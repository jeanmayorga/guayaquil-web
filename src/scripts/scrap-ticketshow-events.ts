import { format } from "date-fns";
import { supabase } from "../lib/supabase";
import { TZDate } from "@date-fns/tz";

interface Response {
  id: string;
  nombre: string;
  fechaevento: string;
  fechaeventofin: string;
  lugar: string;
  ciudad: string;
  imagenpequeña: string;
  imagenmediana: string;
  redirectlink: string;
  title?: string;
}

function getDateInEcuadorTZ(utcDate: string) {
  const tzDate = new TZDate(utcDate, "America/Guayaquil");
  return format(tzDate, "yyyy-MM-dd");
}
function getTimeInEcuadorTZ(utcDate: string) {
  const tzDate = new TZDate(utcDate, "America/Guayaquil");
  return format(tzDate, "HH:mm:ss");
}

async function getEvents(city: string, countByPage: number) {
  const request = await fetch(
    "http://microservicios.ticketshow.com.ec/coba/product/getEventosByFiltro",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://www.ticketshow.com.ec/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"ciudad":"${city}","cantmaxticket":${countByPage}}`,
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-cache",
    }
  );

  const response = (await request.json()) as Response[];

  return response;
}

export default async function main() {
  const resultsEvents = await Promise.allSettled([
    getEvents("Guayaquil", 0),
    getEvents("Guayaquil", 9),
    getEvents("Guayaquil", 18),
    getEvents("Samborondon", 0),
    getEvents("Samborondon", 9),
  ]);

  const results = resultsEvents.flatMap((promise) => {
    if (promise.status === "fulfilled") {
      return promise.value;
    }
    return [];
  });
  const events = results.flat();

  const mapped = events
    .map((tsEvent) => {
      const start_date = getDateInEcuadorTZ(tsEvent.fechaevento);
      const end_date = getDateInEcuadorTZ(tsEvent.fechaeventofin);
      const start_time = getTimeInEcuadorTZ(tsEvent.fechaevento);
      const end_time = getTimeInEcuadorTZ(tsEvent.fechaeventofin);

      console.log(`ticketShow: ${start_date} ${start_time} ${tsEvent.nombre}`);
      return {
        cover_image: tsEvent.imagenmediana || tsEvent.imagenpequeña,
        name: tsEvent.nombre.trim(),
        slug: `ts-${tsEvent.id}`,
        url:
          tsEvent.redirectlink ||
          `https://www.ticketshow.com.ec/evento/${tsEvent.title}`,
        start_date: start_date,
        start_time: start_time,
        end_date: end_date,
        end_time: end_time,
        start_at: `${start_date} ${start_time}`,
        end_at: `${end_date} ${end_time}`,
        location_name: `${tsEvent.lugar.trim()}, ${tsEvent.ciudad.trim()}`,
        last_updated: new Date().toISOString(),
      };
    })
    .filter(
      (event, index, self) =>
        index === self.findLastIndex((e) => e.slug === event.slug)
    );

  const data = await supabase.from("events").upsert(mapped, {
    ignoreDuplicates: false,
    onConflict: "slug",
    count: "estimated",
  });

  if (data.error) {
    console.error("Error al hacer upsert:", data.error);
    return 0;
  }

  console.log(`ticketShow total: ${events.length}`);

  return data.count || 0;
}
