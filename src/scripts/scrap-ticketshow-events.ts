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
    console.log(`ticketShow: mapped ${tsEvent.nombre}`);
    return {
      cover_image: tsEvent.imagenmediana || tsEvent.imagenpequeña,
      name: tsEvent.nombre,
      slug: `ticketshow-${tsEvent.id}`,
      url:
        tsEvent.redirectlink ||
        `https://www.ticketshow.com.ec/evento/${tsEvent.title}`,
      start_date: tsEvent.fechaevento.split("T")[0],
      end_date: tsEvent.fechaeventofin.split("T")[0],
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
