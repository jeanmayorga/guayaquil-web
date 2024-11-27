import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Roboto } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { Header } from "@/components/Header";

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
        <body className={cn(roboto.className, "bg-gray-100 dark:bg-gray-950")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <Header />

              {children}
              <Analytics />
              <SpeedInsights />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
