import { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "next-view-transitions";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { places } from "./places";

export const metadata: Metadata = {
  title: "Conoce Guayaquil: guía turística de la Perla del Pacífico",
  description:
    "Qué ver y hacer en Guayaquil, Ecuador: Malecón 2000, Las Peñas, el Cerro Santa Ana, el Parque de las Iguanas, gastronomía, clima y cómo moverte por la ciudad.",
  keywords: [
    "turismo Guayaquil",
    "qué hacer en Guayaquil",
    "qué visitar en Guayaquil",
    "lugares turísticos Guayaquil",
    "Guayaquil Ecuador",
    "Malecón 2000",
    "Las Peñas Guayaquil",
    "Perla del Pacífico",
  ],
  alternates: { canonical: "/sobre-guayaquil" },
  openGraph: {
    siteName: "Guayaquil App",
    title: "Conoce Guayaquil: qué ver y hacer en la Perla del Pacífico",
    description:
      "Guía turística de Guayaquil: atractivos, gastronomía, clima y cómo moverte por la ciudad.",
    url: "https://guayaquil.app/sobre-guayaquil",
    type: "article",
    images: [{ url: "https://guayaquil.app/block4.jpg", width: 1120, height: 753 }],
  },
};

export default function SobreGuayaquilPage() {
  return (
    <Container>
      <article>
        <section className="relative mb-10 h-[260px] overflow-hidden rounded-3xl md:h-[360px]">
          <img
            src="/block4.jpg"
            alt="Guayaquil, Ecuador"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            <span className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-300">
              <MapPin className="h-4 w-4" />
              Guayaquil, Ecuador
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Conoce Guayaquil
            </h1>
            <p className="mt-2 text-gray-200">La Perla del Pacífico</p>
          </div>
        </section>

        <div className="max-w-3xl">
          <p className="text-balance text-lg leading-relaxed text-muted-foreground">
            Guayaquil es la ciudad más grande y el principal puerto de Ecuador.
            Ubicada a orillas del río Guayas, es el motor económico del país y la
            puerta de entrada a la costa y a las Islas Galápagos. Conocida como
            la <strong className="text-foreground">Perla del Pacífico</strong>,
            combina una historia portuaria centenaria con malecones modernos,
            barrios coloridos y una vibrante vida cultural.
          </p>

          <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
            Qué visitar en Guayaquil
          </h2>
          <p className="mb-6 text-muted-foreground">
            Estos son algunos de los lugares turísticos imperdibles de la ciudad.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {places.map((p) => (
              <Link
                key={p.slug}
                href={`/sobre-guayaquil/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-500/60"
              >
                <h3 className="mb-1 font-semibold transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                  {p.name}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-cyan-600 dark:text-cyan-400">
                  Ver más y cómo llegar
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
            Gastronomía
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            La cocina guayaquileña gira en torno al mar y al plátano verde.
            Imperdibles: el <strong className="text-foreground">encebollado</strong>{" "}
            (considerado plato nacional), el ceviche de camarón o concha, el bolón
            de verde, el encocado y el cangrejo criollo. Cualquier visita queda
            incompleta sin probar el marisco fresco de la costa.
          </p>

          <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
            Clima y cuándo visitar
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Guayaquil tiene un clima tropical, cálido y húmedo todo el año, con
            temperaturas que suelen rondar los 25–31 °C. La temporada seca
            (junio a diciembre) es más fresca y cómoda para recorrer la ciudad,
            mientras que la temporada de lluvias (enero a mayo) es más calurosa.
          </p>

          <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
            Cómo moverte
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            La ciudad cuenta con la <strong className="text-foreground">Metrovía</strong>{" "}
            (buses de tránsito rápido), la <strong className="text-foreground">Aerovía</strong>{" "}
            (teleférico que cruza el río Guayas) y taxis y apps de transporte. El
            centro y el Malecón se recorren fácilmente a pie.
          </p>

          <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              ¿Qué hacer hoy en la ciudad?
            </h2>
            <p className="mt-1 mb-4 text-muted-foreground">
              Descubre los conciertos, obras y shows que se vienen en Guayaquil.
            </p>
            <Link href="/events">
              <Button className="rounded-full">
                Ver eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Container>
  );
}
