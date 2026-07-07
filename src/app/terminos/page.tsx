import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: { absolute: "Términos y condiciones | Guayaquil.app" },
  description:
    "Términos y condiciones de uso de Guayaquil.app: naturaleza del sitio, exactitud de la información de eventos, propiedad intelectual y responsabilidad.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

const UPDATED = "6 de julio de 2026";

export default function TerminosPage() {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Términos y condiciones
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: {UPDATED}
        </p>

        <div className="mt-8 flex flex-col gap-6 leading-relaxed text-muted-foreground [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-cyan-600 [&_a]:underline dark:[&_a]:text-cyan-400">
          <p>
            Al acceder y usar{" "}
            <strong className="text-foreground">Guayaquil.app</strong> (el
            “sitio”) aceptas estos términos y condiciones. Si no estás de acuerdo
            con ellos, te pedimos que no utilices el sitio.
          </p>

          <h2>Sobre el sitio</h2>
          <p>
            Guayaquil.app es una agenda cultural informativa que reúne y organiza
            información pública sobre eventos, conciertos y shows en Guayaquil,
            Ecuador, además de una guía turística de la ciudad. El sitio es
            gratuito y su propósito es ayudarte a descubrir qué hacer en la
            ciudad.
          </p>

          <h2>Exactitud de la información</h2>
          <p>
            Procuramos que la información de los eventos (fechas, horarios,
            lugares y precios) sea correcta y esté actualizada, pero puede
            cambiar sin previo aviso por decisión de los organizadores.
            Guayaquil.app no organiza los eventos ni vende entradas: solo enlaza
            a los sitios oficiales de los organizadores o boleterías. Te
            recomendamos <strong className="text-foreground">confirmar
            siempre los detalles y comprar tus entradas directamente en la
            fuente oficial</strong> antes de asistir.
          </p>

          <h2>Compra de entradas</h2>
          <p>
            Cualquier compra de entradas se realiza en los sitios de terceros a
            los que enlazamos, bajo sus propios términos y condiciones.
            Guayaquil.app no participa en esas transacciones ni es responsable de
            ellas, de su disponibilidad, precios, cargos o políticas de
            reembolso.
          </p>

          <h2>Propiedad intelectual</h2>
          <p>
            El diseño, los textos originales (como la guía de la ciudad) y la
            organización del sitio pertenecen a Guayaquil.app. Los nombres,
            imágenes y descripciones de los eventos pertenecen a sus respectivos
            organizadores y titulares de derechos, y se muestran con fines
            informativos y de referencia. Si eres titular de derechos y deseas
            que retiremos o corrijamos algún contenido, escríbenos desde la{" "}
            <Link href="/contacto">página de contacto</Link>.
          </p>

          <h2>Uso aceptable</h2>
          <p>
            Te comprometes a usar el sitio de forma lícita y a no intentar
            dañarlo, sobrecargarlo, extraer sus datos de forma masiva ni
            interferir con su funcionamiento o el de sus proveedores.
          </p>

          <h2>Limitación de responsabilidad</h2>
          <p>
            El sitio se ofrece “tal cual”, sin garantías de ningún tipo. En la
            medida que lo permita la ley, Guayaquil.app no será responsable de
            daños derivados del uso o la imposibilidad de uso del sitio, ni de
            decisiones tomadas con base en la información publicada.
          </p>

          <h2>Cambios en los términos</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. Los cambios
            entran en vigor al publicarse en esta página. El uso continuado del
            sitio implica la aceptación de la versión vigente.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes dudas sobre estos términos, escríbenos desde la{" "}
            <Link href="/contacto">página de contacto</Link>.
          </p>
        </div>
      </article>
    </Container>
  );
}
