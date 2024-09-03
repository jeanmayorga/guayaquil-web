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
    promotional_tag: string | null;
    venue: {
      address: string;
      name: string;
    };
  }[];
}

export default async function main() {
  const baseUrl = "https://app.meet2go.com/items/events";
  const fields =
    "slug,name,cover_image,start_date,end_date,start_time,end_time,promotional_tag,venue.address,venue.name";
  const limit = -1;
  const sort = "start_date";
  const filters = {
    end_date_gte: new Date().toISOString(),
    status_eq: "published",
    venue_city_in: "Guayaquil",
  };

  const queryParams = new URLSearchParams({
    fields: fields,
    limit: limit.toString(),
    sort: sort,
    "filter[end_date][_gte]": filters.end_date_gte,
    "filter[status][_eq]": filters.status_eq,
    "filter[venue][city][_in]": filters.venue_city_in,
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
  });
  const response = (await request.json()) as Response;

  const mapped = response.data.map((m2gEvent) => {
    console.log(`meet2go: mapped ${m2gEvent.name}`);
    return {
      cover_image: `https://d20zx9sjn15rrf.cloudfront.net/assets/${m2gEvent.cover_image}?width=350&format=auto&quality=100`,
      name: m2gEvent.name,
      slug: `m2g-${m2gEvent.slug}`,
      url: `https://www.meet2go.com/ev/${m2gEvent.slug}`,
      start_date: m2gEvent.start_date,
      end_date: m2gEvent.end_date,
      location_name: m2gEvent.venue.name,
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

  console.log(`meet2go: total ${response.data.length}}`);
}
