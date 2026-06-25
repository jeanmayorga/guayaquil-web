import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Rango de diacríticos combinantes (U+0300–U+036F). Se construye con escapes
// para no incluir caracteres combinantes "sueltos" en el fuente (rompen Terser).
const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

// Convierte un texto en un slug url-safe: minúsculas, sin tildes ni símbolos.
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "") // quita tildes; ñ -> n
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // todo lo no alfanumérico -> guion
    .replace(/^-+|-+$/g, ""); // sin guiones al inicio/fin
}
