import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Logo } from "@/components/Logo";
import { MobileMenuButton } from "@/components/mobile-menu-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://guayaquil.app"),
  title: {
    default: "Guayaquil | Eventos, shows y conciertos en la ciudad",
    template: "%s | Guayaquil",
  },
  description:
    "Descubre los eventos, conciertos y shows más destacados de Guayaquil. La agenda cultural de la ciudad, en un solo lugar.",
  applicationName: "Guayaquil",
  keywords: [
    "eventos Guayaquil",
    "conciertos Guayaquil",
    "shows Guayaquil",
    "qué hacer en Guayaquil",
    "agenda cultural Guayaquil",
  ],
  openGraph: {
    siteName: "Guayaquil",
    type: "website",
    locale: "es_EC",
    url: "https://guayaquil.app",
    images: [{ url: "/block2.jpg", width: 1120, height: 753 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={GeistSans.variable}>
        <meta
          name="google-site-verification"
          content="pzLChC3XsCNZpXUcP4jBhm83YPDTt5x9vvdvlQ8QuVg"
        />
        <body className={cn(GeistSans.className, "min-h-screen antialiased")}>
          {/* Google tag (gtag.js) - GA4 */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XZ3LY3G0C7"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XZ3LY3G0C7');
            `}
          </Script>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-14 shrink-0 items-center justify-between px-4 lg:hidden">
                  <Link href="/">
                    <Logo className="h-10 w-auto" />
                  </Link>
                  <MobileMenuButton />
                </header>
                <div className="pt-2 lg:pt-10 pb-16">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
