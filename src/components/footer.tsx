import Link from "next/link";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/events", label: "Eventos" },
  { href: "/sobre-guayaquil", label: "Conoce la ciudad" },
];

const about = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

const legal = [
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex">
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              La agenda cultural de Guayaquil: conciertos, obras, exposiciones y
              shows de la ciudad, en un solo lugar.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Explora
            </h3>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Sitio
            </h3>
            <ul className="flex flex-col gap-2">
              {about.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="flex flex-col gap-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            © {year} Guayaquil.app · Hecho en Guayaquil, Ecuador. Los eventos
            enlazan a sus organizadores oficiales.
          </p>
        </div>
      </div>
    </footer>
  );
}
