import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Navigation, Bus } from "lucide-react";
import { Link } from "next-view-transitions";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { getPlace, places } from "../places";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const place = getPlace(slug);
  if (!place) return {};

  const title = `${place.name} en Guayaquil: qué es y cómo llegar`;
  return {
    title,
    description: place.summary,
    keywords: [
      place.name,
      `${place.name} Guayaquil`,
      `cómo llegar a ${place.name}`,
      "turismo Guayaquil",
      "qué visitar en Guayaquil",
    ],
    alternates: { canonical: `/sobre-guayaquil/${place.slug}` },
    openGraph: {
      siteName: "Guayaquil App",
      title,
      description: place.summary,
      url: `https://guayaquil.app/sobre-guayaquil/${place.slug}`,
      type: "article",
    },
  };
}

export default async function PlacePage(props: Props) {
  const { slug } = await props.params;
  const place = getPlace(slug);
  if (!place) notFound();

  const query = encodeURIComponent(place.mapsQuery);
  const mapEmbed = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <Container>
      <article className="max-w-3xl">
        <Link
          href="/sobre-guayaquil"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Conoce la ciudad
        </Link>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {place.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{place.tagline}</p>

        <div className="mt-8 flex flex-col gap-4">
          {place.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Cómo llegar</h2>

          <p className="mt-2 flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-1 h-4 w-4 flex-none text-cyan-500" />
            {place.address}
          </p>

          <iframe
            title={`Mapa de ${place.name} en Guayaquil`}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-4 h-72 w-full rounded-2xl border border-border"
          />

          <ul className="mt-5 flex flex-col gap-3">
            {place.howToGet.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <Bus className="mt-1 h-4 w-4 flex-none text-cyan-500" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>

          <a href={directions} target="_blank" rel="noopener noreferrer">
            <Button className="mt-6 rounded-full">
              <Navigation className="mr-2 h-4 w-4" />
              Cómo llegar en Google Maps
            </Button>
          </a>
        </section>

        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            ¿Qué hacer en Guayaquil?
          </h2>
          <p className="mt-1 mb-4 text-muted-foreground">
            Mira los eventos, conciertos y shows de la ciudad.
          </p>
          <Link href="/events">
            <Button variant="outline" className="rounded-full">
              Ver eventos
            </Button>
          </Link>
        </div>
      </article>
    </Container>
  );
}
