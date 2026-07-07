import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Landmark, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Quiénes somos | Guayaquil.app" },
  description:
    "Guayaquil.app es la agenda cultural de Guayaquil: reunimos en un solo lugar los conciertos, obras, exposiciones y shows de la ciudad, más una guía turística.",
  alternates: { canonical: "/quienes-somos" },
  openGraph: {
    siteName: "Guayaquil App",
    title: "Quiénes somos | Guayaquil.app",
    description:
      "La agenda cultural independiente de Guayaquil: qué hacer, a dónde ir y qué visitar en la ciudad.",
    url: "https://www.guayaquil.app/quienes-somos",
    type: "article",
  },
};

export default function QuienesSomosPage() {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <span className="flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
          <MapPin className="h-4 w-4" />
          Guayaquil, Ecuador
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Quiénes somos
        </h1>

        <div className="mt-8 flex flex-col gap-6 leading-relaxed text-muted-foreground">
          <p className="text-balance text-lg text-foreground">
            Guayaquil.app nació de una idea sencilla: enterarse de lo que pasa en
            Guayaquil no debería ser complicado.
          </p>
          <p>
            La oferta cultural de la ciudad está repartida entre decenas de
            boleterías, cuentas de redes sociales y afiches sueltos. Es fácil
            perderse un buen concierto, una obra de teatro o una exposición
            simplemente porque no te enteraste a tiempo. Creamos Guayaquil.app
            para resolver eso: reunimos en un solo lugar, ordenados por fecha,
            los eventos, conciertos y shows que se vienen en la ciudad, con la
            información esencial y un enlace directo a la boletería oficial.
          </p>
          <p>
            Somos un proyecto independiente hecho en Guayaquil, por y para
            guayaquileños y quienes visitan la Perla del Pacífico. No
            organizamos eventos ni vendemos entradas: nuestro trabajo es
            reunir, verificar y presentar la agenda de la ciudad de la forma más
            clara posible, para que tú solo tengas que decidir a dónde ir.
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Qué hacemos
          </h2>
          <p>
            Cada semana revisamos la cartelera de Guayaquil y actualizamos la
            agenda con lo nuevo. Para cada evento intentamos ofrecerte lo que
            realmente importa antes de salir de casa:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Fecha y hora, con una cuenta regresiva para los más próximos.</li>
            <li>Lugar y un mapa para saber exactamente cómo llegar.</li>
            <li>Descripción del evento y tipos de entradas disponibles.</li>
            <li>
              Un enlace directo al sitio oficial del organizador para comprar con
              seguridad.
            </li>
          </ul>
          <p>
            Además, mantenemos una{" "}
            <Link
              href="/sobre-guayaquil"
              className="font-medium text-cyan-600 underline dark:text-cyan-400"
            >
              guía de la ciudad
            </Link>{" "}
            con los lugares imperdibles de Guayaquil —el Malecón 2000, Las Peñas,
            el Parque de las Iguanas y más—, pensada tanto para quien visita por
            primera vez como para quien quiere redescubrir su ciudad.
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Nuestro compromiso
          </h2>
          <p>
            Cuidamos que la información esté al día, pero los planes cambian: por
            eso siempre te enlazamos a la fuente oficial para que confirmes los
            detalles y compres tus entradas directamente. Si detectas un dato
            incorrecto o quieres que sumemos un evento, escríbenos; este proyecto
            crece con la comunidad.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/events"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-500/60"
          >
            <CalendarDays className="h-6 w-6 flex-none text-cyan-500" />
            <div>
              <span className="block font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                Ver la agenda
              </span>
              <span className="text-sm text-muted-foreground">
                Eventos, conciertos y shows
              </span>
            </div>
          </Link>
          <Link
            href="/sobre-guayaquil"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-cyan-500/60"
          >
            <Landmark className="h-6 w-6 flex-none text-cyan-500" />
            <div>
              <span className="block font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                Conoce la ciudad
              </span>
              <span className="text-sm text-muted-foreground">
                Guía turística de Guayaquil
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            ¿Tienes una consulta o un evento por sumar?
          </h2>
          <p className="mt-1 mb-4 text-muted-foreground">
            Nos encantaría saber de ti.
          </p>
          <Link href="/contacto">
            <Button className="rounded-full">
              Escríbenos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </article>
    </Container>
  );
}
