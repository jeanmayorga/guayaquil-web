export type EventTab =
  | "past"
  | "all"
  | "today"
  | "this-week"
  | "this-month"
  | "next-month";
export interface EventType {
  id: number;
  cover_image: string;
  name: string;
  slug: string;
  start_date: string;
  start_time: string;
  start_at: string;
  end_date: string;
  end_time: string;
  end_at: string;
  location_name: string;
  url: string;
  last_updated: string;
  created_at: string;
  description: string | null;
  information: string | null;
  tickets:
    | {
        title: string;
        name?: string;
        description: string;
        price: number;
      }[]
    | null;
}

export interface GetEventSearchParams {
  slug: string;
  log?: string;
}
