import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <body
          className={cn(
            GeistSans.className
            // "grid grid-cols-12"
          )}
        >
          {/* <div className="col-span-2">Hola</div>
          <div className="col-span-10"> */}
          {children}
          {/* </div> */}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
