import { getEvent, getEvents } from "@/app/events/services";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const response = await getEvent({ slug });
  const event = response.event;

  return {
    title: event?.name,
    description: `${event?.name}, ${event.location_name}`,
    keywords: [
      event?.name,
      event.location_name,
      event.slug,
      "shows",
      "eventos",
      "conciertos",
      "teatro",
      "obras",
      "Eventos en Guayaquil",
      "Shows en Guayaquil",
      "Conciertos Guayaquil",
      "Festivales Guayaquil",
      "Exposiciones Guayaquil",
    ],
    authors: [
      {
        name: "Jean Paul Mayorga",
        url: "https://jeanmayorga.com",
      },
    ],
    robots: "index, follow",
    openGraph: {
      siteName: `${event?.name} en Guayaquil`,
      title: event?.name,
      description: `${event?.name}, ${event.location_name}`,
      url: `https://guayaquil.app/event/${event.slug}`,
      type: "website",
      images: [
        {
          url: event.cover_image,
          width: 1120,
          height: 753,
          alt: event?.name,
        },
      ],
    },
  };
}

// export async function generateStaticParams() {
//   const response = await getEvents({ limit: 200 });
//   const events = response.events;

//   return events.map((event) => ({ slug: event.slug }));
// }

export default async function Page({ params }: Props) {
  const slug = params.slug;
  const response = await getEvent({ slug });
  const event = response.event;

  if (!event) {
    return redirect("/events");
  }

  return (
    <>
      <section className="relative w-full p-12 bg-cyan-500 overflow-hidden mt-8 rounded-3xl">
        <Image
          src={event.cover_image}
          alt="cover blur"
          fill
          className="blur-xl scale-150 absolute top-0 left-0 w-full h-full"
        />
        <div className="grid grid-cols-2 gap-4 relative">
          <div className="flex items-center justify-center">
            <Image
              src={event.cover_image}
              alt="cover"
              width="300"
              height="100"
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <div className="font-medium text-2xl text-white drop-shadow-lg">
              {event.name}
            </div>

            <div>
              <div className="flex items-center text-gray-100 text-xs gap-2 transition-all mb-1">
                <MapPin className="w-4 h-4" />
                {event.location_name}
              </div>
            </div>

            <a href={event.url} target="_blank" className="w-full my-8">
              <Button className="rounded-full w-full" variant="default">
                Comprar entradas
              </Button>
            </a>
          </div>
        </div>
      </section>
      <section className="mt-8 gap-8">
        <div className="scroll-m-20 font-semibold tracking-tight text-3xl mb-4 block">
          Tickets
        </div>
        {event.tickets?.map((ticket) => (
          <a
            key={`${ticket.title}-${ticket.price}-${ticket.name}`}
            className="grid grid-cols-6 border border-gray-100 rounded-full px-8 py-2 mb-4 hover:bg-gray-100 transition-all"
            href={event.url}
            target="_blank"
          >
            <div className="flex items-center justify-start text-gray-800 text-sm">
              {ticket.title}
            </div>
            <div className="col-span-4 flex items-start justify-center flex-col">
              <span className="block text-gray-900 text-sm">{ticket.name}</span>
              <span className="text-gray-400 text-xs block">
                {ticket.description}
              </span>
            </div>
            <div className="flex items-center justify-end text-gray-800 text-sm">
              $ {ticket.price.toFixed(2)} USD
            </div>
          </a>
        ))}
      </section>
    </>
  );
}
