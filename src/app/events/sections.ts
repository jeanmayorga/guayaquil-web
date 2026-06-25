import { EventType } from "./types";

export const PAGE_SIZE = 6;

export const SECTIONS: { key: string; label: string }[] = [
  { key: "today", label: "Hoy" },
  { key: "this-week", label: "Esta semana" },
  { key: "this-month", label: "Este mes" },
  { key: "next-month", label: "Próximo mes" },
  { key: "past", label: "Pasados" },
];

// Primer lote por sección, fetcheado en el server (SSR) para que el crawler
// vea contenido real.
export type InitialEvents = Record<string, EventType[]>;
