import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Guayaquil en un día: itinerario para tu primera visita",
  },
  description:
    "Itinerario de un día por Guayaquil: Parque de las Iguanas, Malecón 2000, Mercado del Río, Las Peñas, Cerro Santa Ana y cena en Urdesa. Con tiempos y consejos.",
  keywords: [
    "Guayaquil en un día",
    "itinerario Guayaquil",
    "qué hacer en Guayaquil en un día",
    "ruta turística Guayaquil",
    "un día en Guayaquil",
  ],
  alternates: { canonical: "/sobre-guayaquil/guayaquil-en-un-dia" },
  openGraph: {
    siteName: "Guayaquil App",
    title: "Guayaquil en un día: itinerario para tu primera visita",
    description:
      "Una ruta a pie por lo esencial de Guayaquil, del Parque de las Iguanas al atardecer en el Cerro Santa Ana.",
    url: "https://www.guayaquil.app/sobre-guayaquil/guayaquil-en-un-dia",
    type: "article",
  },
};

const stops = [
  {
    time: "8:30",
    title: "Desayuno guayaco",
    body: "Empieza el día como un local: bolón, tigrillo o, si te atreves, un encebollado. Cerca del centro encontrarás huecas y cafeterías para todos los gustos.",
    link: { href: "/sobre-guayaquil/gastronomia", label: "Guía gastronómica" },
  },
  {
    time: "9:30",
    title: "Parque Seminario y la Catedral",
    body: "Arranca en el Parque de las Iguanas, saluda a sus habitantes más famosos y visita la Catedral Metropolitana, justo enfrente. Estás en pleno casco histórico.",
    link: {
      href: "/sobre-guayaquil/parque-seminario-iguanas",
      label: "Parque Seminario",
    },
  },
  {
    time: "10:30",
    title: "Malecón 2000",
    body: "Camina hacia el río y recorre el Malecón de sur a norte: La Rotonda, la Torre Morisca, los jardines y los miradores sobre el Guayas. Tómatelo con calma.",
    link: { href: "/sobre-guayaquil/malecon-2000", label: "Malecón 2000" },
  },
  {
    time: "13:00",
    title: "Almuerzo en el Mercado del Río",
    body: "En el tramo norte del Malecón, este mercado gastronómico reúne decenas de locales: perfecto para probar ceviche, cangrejo o arroz con menestra con vista al río.",
    link: { href: "/sobre-guayaquil/mercado-del-rio", label: "Mercado del Río" },
  },
  {
    time: "15:00",
    title: "Las Peñas y el Cerro Santa Ana",
    body: "Sigue hacia el barrio más antiguo de la ciudad: casas de colores, galerías y los 444 escalones hasta el faro. La vista panorámica del río y la ciudad lo vale.",
    link: {
      href: "/sobre-guayaquil/las-penas-cerro-santa-ana",
      label: "Las Peñas",
    },
  },
  {
    time: "17:30",
    title: "Atardecer en Puerto Santa Ana",
    body: "Baja del cerro y termina la tarde en el paseo de Puerto Santa Ana, con un café o un helado junto al río. Es el mejor punto para ver caer el sol sobre el Guayas.",
    link: { href: "/sobre-guayaquil/puerto-santa-ana", label: "Puerto Santa Ana" },
  },
  {
    time: "20:00",
    title: "Cena en Urdesa",
    body: "Cierra el día en el barrio gastronómico clásico de la ciudad. Si es tu primera vez en Guayaquil, la cangrejada es el ritual obligado (con reserva el fin de semana).",
    link: { href: "/sobre-guayaquil/urdesa", label: "Urdesa" },
  },
];

export default function GuayaquilEnUnDiaPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guayaquil en un día: itinerario para tu primera visita",
    description:
      "Ruta de un día por lo esencial de Guayaquil, con tiempos y consejos.",
    inLanguage: "es-EC",
    url: "https://www.guayaquil.app/sobre-guayaquil/guayaquil-en-un-dia",
    author: { "@type": "Organization", name: "Guayaquil.app" },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Conoce la ciudad",
        item: "https://www.guayaquil.app/sobre-guayaquil",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guayaquil en un día",
        item: "https://www.guayaquil.app/sobre-guayaquil/guayaquil-en-un-dia",
      },
    ],
  };

  return (
    <Container>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <article className="mx-auto max-w-3xl">
        <Link
          href="/sobre-guayaquil"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Conoce la ciudad
        </Link>

        <span className="flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
          <Clock className="h-4 w-4" />
          Itinerario
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Guayaquil en un día
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          ¿Solo tienes un día en la ciudad? Esta ruta cubre lo esencial de
          Guayaquil a pie, del casco histórico al atardecer junto al río, con
          paradas para comer como un local. Todo el recorrido del centro se hace
          caminando; solo necesitarás taxi para la cena.
        </p>

        <ol className="mt-10 flex flex-col gap-0">
          {stops.map((stop, i) => (
            <li key={stop.time} className="relative flex gap-5 pb-8">
              {i < stops.length - 1 && (
                <span
                  className="absolute left-[27px] top-10 h-full w-px bg-border"
                  aria-hidden
                />
              )}
              <span className="z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                {stop.time}
              </span>
              <div className="pt-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  {stop.title}
                </h2>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {stop.body}
                </p>
                <Link
                  href={stop.link.href}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  {stop.link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-6 mb-2 text-2xl font-semibold tracking-tight">
          Consejos para la ruta
        </h2>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed text-muted-foreground">
          <li>
            Guayaquil es calurosa todo el año: lleva agua, gorra y protector
            solar, y camina por la sombra del malecón.
          </li>
          <li>
            El ascenso al Cerro Santa Ana es mejor a media tarde, cuando baja el
            sol; lleva calzado cómodo.
          </li>
          <li>
            Para moverte fuera del centro usa apps de transporte o taxis
            registrados.
          </li>
          <li>
            ¿Tienes un segundo día? Suma la{" "}
            <Link
              href="/sobre-guayaquil/isla-santay"
              className="font-medium text-cyan-600 underline dark:text-cyan-400"
            >
              Isla Santay
            </Link>{" "}
            en bici, el{" "}
            <Link
              href="/sobre-guayaquil/parque-historico"
              className="font-medium text-cyan-600 underline dark:text-cyan-400"
            >
              Parque Histórico
            </Link>{" "}
            o el{" "}
            <Link
              href="/sobre-guayaquil/cerro-blanco"
              className="font-medium text-cyan-600 underline dark:text-cyan-400"
            >
              Bosque Protector Cerro Blanco
            </Link>
            .
          </li>
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            ¿Y esta noche qué hay?
          </h2>
          <p className="mt-1 mb-4 text-muted-foreground">
            Revisa la agenda de conciertos, obras y shows de la ciudad.
          </p>
          <Link href="/events">
            <Button className="rounded-full">
              Ver eventos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </article>
    </Container>
  );
}
