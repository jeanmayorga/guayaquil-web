"use client";

import { BackButton } from "@/components/back-button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { EventType } from "../types";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();
      setEvent(result.data as EventType);
      setLoading(false);
    };
    fetchEvent();
  }, [slug]);

  if (!event) return <>Loading..</>;

  return (
    <>
      <BackButton />
      <header className="relative">
        <div className="relative overflow-hidden bg-black flex items-center justify-center h-[300px] rounded-xl">
          <img
            src={event.cover_image}
            alt={event.name}
            className="w-full blur-xl"
          />
        </div>
        <div className="flex justify-center">
          <div className="relative bg-black -mt-80">
            <img
              src={event.cover_image}
              alt={event.name}
              className="aspect-video rounded-xl"
            />
          </div>
        </div>
      </header>
    </>
  );
}
