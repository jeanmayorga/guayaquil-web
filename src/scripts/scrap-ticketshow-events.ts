import { format } from "date-fns";
import { pathToFileURL } from "url";
import { supabase } from "../lib/supabase";
import { TZDate } from "@date-fns/tz";
import * as cheerio from "cheerio";
import { EventType } from "@/app/events/types";
import { slugify } from "../lib/utils";

interface Localidad {
  nombre: string;
  precio: string;
  descripcion: string;
}

interface Response {
  id: string;
  idevento: string;
  nombre: string;
  fechaevento: string;
  fechaeventofin: string;
  lugar: string;
  ciudad: string;
  imagengrande: string;
  imagenmediana: string;
  imagenPequena: string;
  redirect: boolean;
  redirectlink: string;
  title: string;
  description: string;
  keywords: string;
}

interface EventDetail {
  localidad?: Localidad[];
}

const API_URL =
  "https://microservicios.ticketshow.com.ec/product/coba/getEventosByFiltros";

// Detalle por título: trae las localidades/precios que ya no vienen en el listado
// (funciona sin token para los eventos de la plataforma nueva, redirect=false).
const DETAIL_URL =
  "https://microservicios.ticketshow.com.ec/coba/product/getEventosByTitle";

// Ciudades del área de Guayaquil. OJO: el API es sensible a mayúsculas.
const CITIES = ["GUAYAQUIL", "SAMBORONDON", "DAULE", "DURAN"];

// El API pagina con `cantmaxticket` como offset, en bloques de PAGE_SIZE.
const PAGE_SIZE = 9;

function getDateInEcuadorTZ(utcDate: string) {
  const tzDate = new TZDate(utcDate, "America/Guayaquil");
  return format(tzDate, "yyyy-MM-dd");
}
function getTimeInEcuadorTZ(utcDate: string) {
  const tzDate = new TZDate(utcDate, "America/Guayaquil");
  return format(tzDate, "HH:mm:ss");
}

async function fetchPage(city: string, offset: number) {
  const request = await fetch(API_URL, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "es-ES,es;q=0.9,en;q=0.8",
      "content-type": "application/json",
      origin: "https://www.ticketshow.com.ec",
      referer: "https://www.ticketshow.com.ec/",
    },
    body: JSON.stringify({ ciudad: city, cantmaxticket: offset }),
    method: "POST",
    cache: "no-cache",
  });

  if (!request.ok) {
    console.error(`ticketShow: ${city} offset ${offset} -> HTTP ${request.status}`);
    return [];
  }

  return (await request.json()) as Response[];
}

// Trae todos los eventos de una ciudad recorriendo las páginas hasta que se vacíe.
async function getEventsByCity(city: string) {
  const all: Response[] = [];
  let offset = 0;

  while (true) {
    const page = await fetchPage(city, offset);
    if (page.length === 0) break;
    all.push(...page);
    offset += PAGE_SIZE;
    // Salvaguarda: si una página llega incompleta, ya no hay más.
    if (page.length < PAGE_SIZE) break;
  }

  return all;
}

function extractFirstPrice(priceText: string) {
  const regex = /\$\s*(\d{1,3}(?:[.,]\d{2})?)/;
  const match = priceText.match(regex);
  const price = match?.[1].replace(",", ".");
  return Number(price);
}

// Las localidades/precios ya no vienen en el JSON del listado: se obtienen
// raspando la página synopsis (solo disponible para eventos con redirect).
async function getEventTickets(url: string) {
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);

    let data: EventType["tickets"] = [];

    const selectors = [
      "#divTableLocalidades table tbody tr",
      "#divSynopsisConten table tbody tr",
    ];

    for (const selector of selectors) {
      $(selector).each((index, element) => {
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

      if (data.length > 0) break;
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Trae el detalle del evento (incluye las localidades con precio).
async function fetchEventDetail(title: string): Promise<EventDetail | null> {
  try {
    const request = await fetch(DETAIL_URL, {
      headers: {
        "content-type": "application/json",
        origin: "https://www.ticketshow.com.ec",
        referer: "https://www.ticketshow.com.ec/",
      },
      body: JSON.stringify({ title }),
      method: "POST",
      cache: "no-cache",
    });
    if (!request.ok) return null;
    const data = (await request.json()) as EventDetail[];
    return data?.[0] ?? null;
  } catch (error) {
    console.error("Error detalle:", error);
    return null;
  }
}

function ticketsFromLocalidades(localidad: Localidad[]): EventType["tickets"] {
  const tickets = localidad
    .map((l) => {
      const price = Number(l.precio);
      if (!price || price <= 0) return null; // descarta gratis / sin precio
      return {
        title: "Ticketshow",
        description: l.descripcion,
        name: l.nombre,
        price,
      };
    })
    .filter((t) => t !== null);

  return tickets.length > 0 ? tickets : null;
}

async function getTickets(tsEvent: Response, url: string) {
  // 1) Plataforma nueva (redirect=false): precios en el detalle por título.
  const detail = await fetchEventDetail(tsEvent.title);
  const fromDetail = ticketsFromLocalidades(detail?.localidad ?? []);
  if (fromDetail) return fromDetail;

  // 2) Plataforma antigua (redirect=true): precios en la página synopsis.
  if (tsEvent.redirect && url.includes("synopsis.aspx")) {
    const scraped = await getEventTickets(url);
    if (scraped && scraped.length > 0) return scraped;
  }

  return null;
}

export default async function main() {
  const resultsEvents = await Promise.allSettled(
    CITIES.map((city) => getEventsByCity(city))
  );

  const events = resultsEvents.flatMap((promise) =>
    promise.status === "fulfilled" ? promise.value : []
  );

  const mapped: Omit<EventType, "id" | "created_at">[] = [];

  for (const tsEvent of events) {
    const start_date = getDateInEcuadorTZ(tsEvent.fechaevento);
    const end_date = getDateInEcuadorTZ(tsEvent.fechaeventofin);
    const start_time = getTimeInEcuadorTZ(tsEvent.fechaevento);
    const end_time = getTimeInEcuadorTZ(tsEvent.fechaeventofin);

    const url =
      tsEvent.redirectlink ||
      `https://www.ticketshow.com.ec/evento/${tsEvent.title}`;
    const tickets = await getTickets(tsEvent, url);

    const information = [tsEvent.description, tsEvent.keywords]
      .filter(Boolean)
      .join("\n\n");

    console.log(`ticketShow: ${start_date} ${start_time} ${tsEvent.nombre}`);
    const newEvent: Omit<EventType, "id" | "created_at"> = {
      cover_image:
        tsEvent.imagenmediana || tsEvent.imagengrande || tsEvent.imagenPequena,
      name: tsEvent.nombre.trim(),
      // Slug legible/SEO a partir del título de TicketShow (único y estable).
      slug: `ts-${slugify(tsEvent.title) || tsEvent.id}`,
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
      description: tsEvent.description,
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

  console.log(`ticketShow total: ${mappedFinish.length}`);

  return data.count || 0;
}

// Permite ejecutarlo directo con `yarn scrap:ts` sin afectar al import del cron.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
    .then((count) => {
      console.log(`ticketShow upserted: ${count}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
