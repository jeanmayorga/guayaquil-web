import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, UtensilsCrossed } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Qué comer en Guayaquil: guía gastronómica de la ciudad",
  },
  description:
    "Guía completa de la comida guayaquileña: encebollado, cangrejada, bolón, ceviche, arroz con menestra y dónde probarlos — huecas, cangrejales y el Mercado del Río.",
  keywords: [
    "qué comer en Guayaquil",
    "comida típica Guayaquil",
    "encebollado Guayaquil",
    "cangrejada Guayaquil",
    "huecas Guayaquil",
    "gastronomía Guayaquil",
  ],
  alternates: { canonical: "/sobre-guayaquil/gastronomia" },
  openGraph: {
    siteName: "Guayaquil App",
    title: "Qué comer en Guayaquil: guía gastronómica",
    description:
      "Los platos imperdibles de Guayaquil y dónde probarlos: encebollado, cangrejada, bolón, ceviche y más.",
    url: "https://www.guayaquil.app/sobre-guayaquil/gastronomia",
    type: "article",
  },
};

const dishes = [
  {
    name: "Encebollado",
    desc: "El plato bandera: sopa de albacora con yuca y cebolla curtida, servida con chifles o pan. Los guayacos lo comen sobre todo en el desayuno y es el remedio oficial después de una noche larga. Se acompaña con limón, ají y, para los clásicos, una cola bien fría.",
  },
  {
    name: "Cangrejada",
    desc: "Más que un plato, un ritual. Cangrejo criollo cocinado en su punto, servido con maduro, salsa de ajo y ensalada; se come con las manos y con martillito de madera. Ten en cuenta las vedas del cangrejo (normalmente en enero y agosto), cuando los cangrejales ajustan su menú.",
  },
  {
    name: "Bolón de verde",
    desc: "Bola de plátano verde majado con queso, chicharrón o mixto, dorada y servida caliente. Es el rey del desayuno guayaco junto con un café. Su primo, el tigrillo, es verde majado revuelto con huevo y queso.",
  },
  {
    name: "Ceviche",
    desc: "En la costa ecuatoriana el ceviche va con su jugo: de camarón, de concha, de pescado o mixto, acompañado de chifles, canguil y arroz. El de camarón es el más pedido; el de concha, el favorito de los conocedores.",
  },
  {
    name: "Arroz con menestra y carne",
    desc: "El almuerzo guayaquileño por excelencia: arroz, menestra de lenteja o fréjol y carne asada al carbón, con patacones. Simple, contundente y en cualquier esquina de la ciudad.",
  },
  {
    name: "Corviche, muchines y bollo",
    desc: "La familia del verde y el maní: el corviche relleno de pescado, los muchines de yuca y el bollo de pescado envuelto en hoja de plátano. Sabores de la costa que encuentras en huecas y mercados tradicionales.",
  },
];

export default function GastronomiaPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Qué comer en Guayaquil: guía gastronómica de la ciudad",
    description:
      "Los platos imperdibles de la cocina guayaquileña y dónde probarlos.",
    inLanguage: "es-EC",
    url: "https://www.guayaquil.app/sobre-guayaquil/gastronomia",
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
        name: "Gastronomía",
        item: "https://www.guayaquil.app/sobre-guayaquil/gastronomia",
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
          <UtensilsCrossed className="h-4 w-4" />
          Guía gastronómica
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Qué comer en Guayaquil
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          La cocina guayaquileña gira en torno al mar y al plátano verde, con el
          maní como aliado inseparable. Comer bien aquí no es caro ni
          complicado: es parte de la vida diaria. Esta es la guía de los platos
          que no te puedes perder y dónde probarlos.
        </p>

        <h2 className="mt-12 mb-5 text-2xl font-semibold tracking-tight">
          Los platos imperdibles
        </h2>
        <div className="flex flex-col gap-4">
          {dishes.map((d) => (
            <div
              key={d.name}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {d.desc}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
          Dónde comer
        </h2>
        <div className="flex flex-col gap-5 leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Las huecas.</strong> Así se
            llaman en Ecuador los locales pequeños, familiares y sin
            pretensiones donde se come el sabor más auténtico. Cada guayaco
            defiende su hueca favorita de encebollado como una cuestión de
            honor. Pregunta a cualquier local y tendrás una recomendación
            apasionada.
          </p>
          <p>
            <strong className="text-foreground">
              El{" "}
              <Link
                href="/sobre-guayaquil/mercado-del-rio"
                className="font-medium text-cyan-600 underline dark:text-cyan-400"
              >
                Mercado del Río
              </Link>
              .
            </strong>{" "}
            Si estás de paseo por el Malecón 2000, este mercado gastronómico
            frente al río reúne decenas de propuestas en un solo lugar: ideal
            para probar varios platos típicos sin salir del circuito turístico.
          </p>
          <p>
            <strong className="text-foreground">
              Los cangrejales de{" "}
              <Link
                href="/sobre-guayaquil/urdesa"
                className="font-medium text-cyan-600 underline dark:text-cyan-400"
              >
                Urdesa
              </Link>{" "}
              y Sauces.
            </strong>{" "}
            Para la cangrejada hay que ir a un cangrejal: mesas con papel,
            martillo de madera y cangrejo por planchas. Los de Urdesa y los de
            Sauces son los más famosos; los fines de semana conviene reservar.
          </p>
          <p>
            <strong className="text-foreground">El desayuno guayaco.</strong>{" "}
            Bolón o tigrillo con café por la mañana, o directamente un
            encebollado: en Guayaquil el desayuno es cosa seria y muchas huecas
            solo abren hasta el mediodía.
          </p>
        </div>

        <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tight">
          Consejos rápidos
        </h2>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed text-muted-foreground">
          <li>
            El encebollado es plato de mañana: las mejores huecas lo sirven
            desde temprano y cierran cuando se acaba.
          </li>
          <li>
            El ají de cada casa es distinto; pruébalo de a poco, algunos pican
            en serio.
          </li>
          <li>
            En temporada de veda del cangrejo (enero y agosto, normalmente) los
            cangrejales ofrecen alternativas como la jaiba.
          </li>
          <li>
            Los almuerzos ejecutivos (sopa + segundo + jugo) son la forma más
            económica de comer bien entre semana.
          </li>
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            ¿Planeando tu visita?
          </h2>
          <p className="mt-1 mb-4 text-muted-foreground">
            Mira nuestro itinerario de un día por la ciudad y la agenda de
            eventos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/sobre-guayaquil/guayaquil-en-un-dia">
              <Button className="rounded-full">
                Guayaquil en un día
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="rounded-full">
                Ver eventos
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Container>
  );
}
