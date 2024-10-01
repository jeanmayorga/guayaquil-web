import { format } from "date-fns";
import { supabase } from "../lib/supabase";
import { TZDate } from "@date-fns/tz";
import * as cheerio from "cheerio";
import { EventType } from "@/app/events/types";

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
  informacion: string;
  description: string;
  keywords: string;
  localidad: {
    nombre: string;
    precio: string;
    descripcion: string;
  }[];
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

function extractFirstPrice(priceText: string) {
  const regex = /\$\s*(\d{1,3}(?:[.,]\d{2})?)/;
  const match = priceText.match(regex);
  const price = match?.[1].replace(",", ".");
  return Number(price);
}

async function getEventTickets(url: string) {
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);

    let data: EventType["tickets"] = [];

    if ($("#divTableLocalidades table tbody tr").length > 0) {
      // Usar el primer selector si el elemento existe
      $("#divTableLocalidades table tbody tr").each((index, element) => {
        const title = $(element).find("th").eq(0).text().trim();
        const price = $(element).find("th").eq(1).text().trim();
        const description = $(element).find("th").eq(2).text().trim();

        if (title && price && description) {
          data.push({
            price: extractFirstPrice(price),
            name: title,
            title: `Ticketshow`,
            description: description,
          });
        }
      });
    }

    if ($("#divSynopsisConten table tbody tr").length > 0) {
      // Usar el segundo selector si el primer elemento no existe
      $("#divSynopsisConten table tbody tr").each((index, element) => {
        const title = $(element).find("th").eq(0).text().trim();
        const price = $(element).find("th").eq(1).text().trim();
        const description = $(element).find("th").eq(2).text().trim();

        if (title && price && description) {
          data.push({
            price: extractFirstPrice(price),
            name: title,
            title: `Ticketshow`,
            description: description,
          });
        }
      });
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function getTickets(localidad: Response["localidad"], url: string) {
  let tickets: EventType["tickets"] = [];

  const ticketsBeforeMap: EventType["tickets"] = localidad
    .map((localidad) => {
      if (localidad.precio === ".00") return null;

      return {
        title: `Ticketshow`,
        description: localidad.descripcion,
        name: localidad.nombre,
        price: Number(localidad.precio),
      };
    })
    .filter((ticket) => ticket !== null);

  if (ticketsBeforeMap.length > 0) {
    tickets = ticketsBeforeMap;
  } else {
    const scrapTickets = await getEventTickets(url);
    if (scrapTickets.length > 0) tickets = scrapTickets;
  }

  return tickets.length > 0 ? tickets : null;
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

  const mapped: Omit<EventType, "id" | "created_at">[] = [];

  for (const tsEvent of events) {
    const start_date = getDateInEcuadorTZ(tsEvent.fechaevento);
    const end_date = getDateInEcuadorTZ(tsEvent.fechaeventofin);
    const start_time = getTimeInEcuadorTZ(tsEvent.fechaevento);
    const end_time = getTimeInEcuadorTZ(tsEvent.fechaeventofin);

    const url =
      tsEvent.redirectlink ||
      `https://www.ticketshow.com.ec/evento/${tsEvent.title}`;
    const tickets = await getTickets(tsEvent.localidad, url);

    const information = `${tsEvent.description}\n\n${tsEvent.keywords}`;

    console.log(`ticketShow: ${start_date} ${start_time} ${tsEvent.nombre}`);
    const newEvent: Omit<EventType, "id" | "created_at"> = {
      cover_image: tsEvent.imagenmediana || tsEvent.imagenpequeña,
      name: tsEvent.nombre.trim(),
      slug: `ts-${tsEvent.id}`,
      url: url,
      start_date: start_date,
      start_time: start_time,
      end_date: end_date,
      end_time: end_time,
      start_at: `${start_date} ${start_time}`,
      end_at: `${end_date} ${end_time}`,
      tickets: tickets,
      location_name: `${tsEvent.lugar.trim()}, ${tsEvent.ciudad.trim()}`,
      last_updated: new Date().toISOString(),
      description: tsEvent.informacion,
      information,
    };
    mapped.push(newEvent);
  }

  const mappedFinish = mapped.filter(
    (event, index, self) =>
      index === self.findLastIndex((e) => e.slug === event.slug)
  );

  const data = await supabase.from("events").upsert(mappedFinish, {
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

// async function main2() {
//   const result = await getEventTickets(
//     "https://sale.ticketshow.com.ec/rps/synopsis.aspx?evento=8641&nombreEvento=La_Noche_Soda_&_Rock_Latino_&ciudad=Samborondon"
//   );

//   console.log(result);
//   return;
// }

// main();
