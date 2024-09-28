import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "./theme-provider";

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
        <body className={cn(GeistSans.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-cyan-500 py-2 px-4 flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/gye-logo.png"
                  alt="logo"
                  width={110}
                  height={110}
                  className="w-16 h-20"
                />
              </Link>
            </div>
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
