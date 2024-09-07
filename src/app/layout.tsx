import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

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
        <body className={GeistSans.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
