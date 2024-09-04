import { supabase } from "../lib/supabase";

interface Response {
  id: string;
  nombre: string;
  fechaevento: string;
  fechaeventofin: string;
  horario: [
    {
      id: string;
      idEventoHijo: string;
      fecha: string;
      horaInicio: string;
      horaFin: string;
    }
  ];
  lugar: string;
  imagenpequeña: string;
  imagenmediana: string;
  redirectlink: string;
  title?: string;
}

function dateInEcuadorFormat(isoDateString: string) {
  const dateUTC = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Guayaquil",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const dateInEcuador = dateUTC.toLocaleDateString("sv-SE", options);
  return dateInEcuador;
}

export default async function main() {
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
      body: '{"ciudad":"Guayaquil","cantmaxticket":0}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );

  const response = (await request.json()) as Response[];

  const mapped = response.map((tsEvent) => {
    const start_date = dateInEcuadorFormat(tsEvent.fechaevento);
    const end_date = dateInEcuadorFormat(tsEvent.fechaeventofin);

    console.log(
      `ticketShow: mapped ${tsEvent.nombre} startDate: ${start_date} endDate: ${end_date}`
    );
    return {
      cover_image: tsEvent.imagenmediana || tsEvent.imagenpequeña,
      name: tsEvent.nombre,
      slug: `ticketshow-${tsEvent.id}`,
      url:
        tsEvent.redirectlink ||
        `https://www.ticketshow.com.ec/evento/${tsEvent.title}`,
      start_date: start_date,
      end_date: end_date,
      location_name: tsEvent.lugar,
      last_updated: new Date().toISOString(),
    };
  });

  const data = await supabase.from("events").upsert(mapped, {
    ignoreDuplicates: false,
    onConflict: "slug",
  });

  if (data.error) {
    console.error("Error al hacer upsert:", data.error);
    return;
  }

  console.log(`ticketShow total: ${response.length}`);
}
