import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: { absolute: "Política de privacidad | Guayaquil.app" },
  description:
    "Política de privacidad de Guayaquil.app: qué datos recopilamos, uso de cookies, Google Analytics y Google AdSense, y tus derechos.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: true, follow: true },
};

const UPDATED = "6 de julio de 2026";

export default function PoliticaDePrivacidadPage() {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: {UPDATED}
        </p>

        <div className="mt-8 flex flex-col gap-6 leading-relaxed text-muted-foreground [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-cyan-600 [&_a]:underline dark:[&_a]:text-cyan-400 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
          <p>
            En <strong className="text-foreground">Guayaquil.app</strong> nos
            tomamos en serio la privacidad de quienes visitan el sitio. Esta
            política explica qué información recopilamos, cómo la usamos y qué
            opciones tienes al respecto. Al usar este sitio web aceptas las
            prácticas descritas a continuación.
          </p>

          <h2>Quiénes somos</h2>
          <p>
            Guayaquil.app es una agenda cultural que reúne información pública
            sobre eventos, conciertos y shows en Guayaquil, Ecuador, y una guía
            turística de la ciudad. El sitio es operado de forma independiente.
            Puedes contactarnos en cualquier momento a través de nuestra{" "}
            <Link href="/contacto">página de contacto</Link>.
          </p>

          <h2>Qué información recopilamos</h2>
          <p>
            No te pedimos que crees una cuenta ni que nos entregues datos
            personales para navegar el sitio. La información que se recopila es
            principalmente técnica y anónima:
          </p>
          <ul>
            <li>
              Datos de navegación y uso (páginas visitadas, tiempo en el sitio,
              tipo de dispositivo y navegador, país aproximado) recogidos
              mediante herramientas de analítica.
            </li>
            <li>
              Dirección IP y cookies o identificadores similares utilizados por
              nuestros proveedores de analítica y publicidad.
            </li>
            <li>
              La información que decidas enviarnos voluntariamente al
              escribirnos por correo electrónico.
            </li>
          </ul>

          <h2>Cookies y tecnologías similares</h2>
          <p>
            Usamos cookies y tecnologías similares para que el sitio funcione
            correctamente, recordar tus preferencias (como el tema claro u
            oscuro), medir la audiencia y mostrar anuncios. Puedes configurar tu
            navegador para bloquear o eliminar las cookies; ten en cuenta que
            algunas funciones del sitio podrían dejar de funcionar como esperas.
          </p>

          <h2>Google Analytics</h2>
          <p>
            Utilizamos Google Analytics para entender de forma agregada y
            anónima cómo se usa el sitio y así mejorarlo. Google Analytics
            utiliza cookies para recopilar información de uso. Puedes obtener más
            información en la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de privacidad de Google
            </a>{" "}
            e instalar el{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              complemento de inhabilitación de Google Analytics
            </a>
            .
          </p>

          <h2>Publicidad de Google (AdSense)</h2>
          <p>
            Este sitio muestra anuncios a través de Google AdSense. Ten en cuenta
            lo siguiente:
          </p>
          <ul>
            <li>
              Proveedores externos, incluido Google, utilizan cookies para
              mostrar anuncios basados en tus visitas anteriores a este y a
              otros sitios web.
            </li>
            <li>
              El uso que hace Google de las cookies de publicidad le permite a él
              y a sus socios mostrar anuncios a los usuarios en función de su
              visita a este sitio o a otros sitios de Internet.
            </li>
            <li>
              Puedes inhabilitar la publicidad personalizada visitando la{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Configuración de anuncios de Google
              </a>
              . También puedes optar por que proveedores externos dejen de usar
              cookies para la publicidad personalizada en{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aboutads.info/choices
              </a>
              .
            </li>
          </ul>
          <p>
            Para más información sobre cómo Google gestiona los datos en sus
            productos publicitarios, consulta{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              cómo utiliza Google la información de sitios o aplicaciones que
              usan sus servicios
            </a>
            .
          </p>

          <h2>Enlaces a sitios de terceros</h2>
          <p>
            Las fichas de eventos enlazan a los sitios oficiales de sus
            organizadores o boleterías (por ejemplo, para comprar entradas).
            También incrustamos mapas de Google Maps. No somos responsables de
            las prácticas de privacidad ni del contenido de esos sitios de
            terceros; te recomendamos revisar sus propias políticas.
          </p>

          <h2>Tus derechos</h2>
          <p>
            Puedes gestionar o eliminar las cookies desde la configuración de tu
            navegador y ajustar tus preferencias de publicidad en los enlaces
            indicados arriba. Si deseas que atendamos cualquier consulta sobre
            tus datos, escríbenos a través de la{" "}
            <Link href="/contacto">página de contacto</Link>.
          </p>

          <h2>Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política de privacidad para reflejar cambios
            en nuestras prácticas o por motivos legales. Publicaremos cualquier
            cambio en esta misma página e indicaremos la fecha de la última
            actualización.
          </p>
        </div>
      </article>
    </Container>
  );
}
