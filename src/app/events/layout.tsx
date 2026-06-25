import { Metadata } from "next";
import { ReactNode } from "react";

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Cartelera de eventos: conciertos, shows y obras",
      template: "%s | Guayaquil",
    },
    alternates: { canonical: "/events" },
    description:
      "Descubre los eventos y shows más destacados en Guayaquil. Mantente al tanto de los próximos conciertos, exposiciones, festivales y más, organizados cronológicamente para que no te pierdas nada.",
    keywords: [
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
      siteName: "Guayaquil",
      type: "website",
      images: [
        {
          url: "https://www.guayaquil.app/banner.webp",
          width: 1120,
          height: 753,
        },
      ],
    },
  };
}

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return <div>{children}</div>;
}
