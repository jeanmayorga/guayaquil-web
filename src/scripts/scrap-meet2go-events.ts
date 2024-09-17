import { supabase } from "../lib/supabase";

interface Response {
  data: {
    slug: string;
    name: string;
    cover_image: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    description: string; //
    information: string; //
    important_information: string; //
    venue: {
      name: string;
      city: string; //
      address: string; //
    };
    tickets: {
      sale_price: number;
      sale_price_name: string;
      description: string;
    }[];
  }[];
}

async function getEventsFromCity(city: string) {
  const baseUrl = "https://app.meet2go.com/items/events";
  const now = new Date();
  const ecuadorDate = new Date(now.getTime() - 5 * 60 * 60 * 1000);

  const queryParams = new URLSearchParams({
    fields:
      "slug,name,cover_image,start_date,end_date,start_time,end_time,venue.name,venue.city,venue.address,description,information,important_information,tickets.sale_price,tickets.sale_price_name,tickets.description",
    limit: "50",
    sort: "start_date",
    "filter[end_date][_lte]": ecuadorDate.toISOString(),
    "filter[status][_eq]": "published",
    "filter[venue][city][_in]": city,
  });

  const headers = {
    accept: "*/*",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    Referer: "https://www.meet2go.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };

  const request = await fetch(`${baseUrl}?${queryParams.toString()}`, {
    headers,
    body: null,
    method: "GET",
    cache: "no-cache",
  });
  const response = (await request.json()) as Response;
  return response.data;
}

export default async function main() {
  const gye = await getEventsFromCity(
    "GUAYAQUIL,Guayaqul,Guayaquil,guayaquil,Samborondón,Samborondon,samborondon"
  );
  const GuayaqulEvents = await getEventsFromCity("Guayaqul");
  const guayaquilEvents = await getEventsFromCity("Guayaquil");
  const samborondonEvents = await getEventsFromCity("Samborondón");
  const events = [
    ...gye,
    ...GuayaqulEvents,
    ...guayaquilEvents,
    ...samborondonEvents,
  ];

  const mapped = events
    .map((m2gEvent) => {
      console.log(
        `meet2go: ${m2gEvent.start_date} ${m2gEvent.start_time} ${m2gEvent.name}`
      );

      const tickets = m2gEvent.tickets.map((ticket) => {
        return {
          title: ticket.sale_price_name,
          price: ticket.sale_price,
          description: ticket.description,
        };
      });

      return {
        cover_image: `https://d20zx9sjn15rrf.cloudfront.net/assets/${m2gEvent.cover_image}?width=350&format=auto&quality=100`,
        name: m2gEvent.name,
        slug: `m2g-${m2gEvent.slug}`,
        url: `https://www.meet2go.com/ev/${m2gEvent.slug}`,
        start_date: m2gEvent.start_date,
        end_date: m2gEvent.end_date,
        start_time: m2gEvent.start_time,
        end_time: m2gEvent.end_time,
        start_at: `${m2gEvent.start_date} ${m2gEvent.start_time}`,
        end_at: `${m2gEvent.end_date} ${m2gEvent.end_time}`,
        location_name: `${m2gEvent.venue.name}, ${m2gEvent.venue.city}`,
        tickets,
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

  console.log(`meet2go: scrap ${events.length} upsert ${data.count}`);

  return data.count || 0;
}
