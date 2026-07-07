import { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, CalendarPlus } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Contacto | Guayaquil.app" },
  description:
    "¿Tienes una consulta, quieres sumar un evento o reportar un dato? Contáctanos. Estamos para ayudarte con la agenda cultural de Guayaquil.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    siteName: "Guayaquil App",
    title: "Contacto | Guayaquil.app",
    description:
      "Escríbenos para consultas, sugerencias o para sumar tu evento a la agenda de Guayaquil.",
    url: "https://www.guayaquil.app/contacto",
    type: "website",
  },
};

const EMAIL = "jpmayorga@outlook.com";

export default function ContactoPage() {
  return (
    <Container>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Contacto
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Guayaquil.app es un proyecto independiente y nos encanta escuchar a la
          comunidad. Escríbenos para cualquier consulta, sugerencia o
          corrección.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 flex-none text-cyan-500" />
            <div>
              <span className="block text-sm text-muted-foreground">
                Correo electrónico
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-cyan-600 underline dark:text-cyan-400"
              >
                {EMAIL}
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Respondemos lo antes posible, normalmente en un plazo de pocos días
            hábiles.
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-5 inline-block">
            <Button className="rounded-full">
              <Mail className="mr-2 h-4 w-4" />
              Enviar un correo
            </Button>
          </a>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">
          ¿En qué podemos ayudarte?
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <CalendarPlus className="mt-0.5 h-5 w-5 flex-none text-cyan-500" />
            <div>
              <h3 className="font-semibold">Sumar un evento</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                ¿Organizas un concierto, obra o show en Guayaquil? Cuéntanos los
                detalles y lo evaluamos para la agenda.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <MessageSquare className="mt-0.5 h-5 w-5 flex-none text-cyan-500" />
            <div>
              <h3 className="font-semibold">Reportar un dato o sugerir mejoras</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Si ves una fecha, un precio o un lugar equivocado, o tienes una
                idea para mejorar el sitio, escríbenos. Nos ayuda muchísimo.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          También puedes leer más{" "}
          <Link
            href="/quienes-somos"
            className="font-medium text-cyan-600 underline dark:text-cyan-400"
          >
            sobre quiénes somos
          </Link>{" "}
          y cómo trabajamos.
        </p>
      </article>
    </Container>
  );
}
