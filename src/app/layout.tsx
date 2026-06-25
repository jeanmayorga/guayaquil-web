import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Roboto } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Logo } from "@/components/Logo";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "next-view-transitions";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Guayaquil",
  description: "Eventos y shows en la ciudad de Guayaquil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="es">
        <meta
          name="google-site-verification"
          content="pzLChC3XsCNZpXUcP4jBhm83YPDTt5x9vvdvlQ8QuVg"
        />
        <body className={cn(roboto.className, "min-h-screen")}>
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
            <ReactQueryProvider>
              <SidebarProvider>
                <Suspense fallback={null}>
                  <AppSidebar />
                </Suspense>
                <SidebarInset>
                  <header className="flex h-14 shrink-0 items-center gap-2 px-4 lg:hidden">
                    <SidebarTrigger className="-ml-1" />
                    <Link href="/">
                      <Logo className="h-10 w-auto" />
                    </Link>
                  </header>
                  <div className="pt-2 lg:pt-10 pb-16">{children}</div>
                </SidebarInset>
              </SidebarProvider>
              <Analytics />
              <SpeedInsights />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
