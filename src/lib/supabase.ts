import { createClient } from "@supabase/supabase-js";

// Solo se usa desde el server (server actions, server components, scripts).
// La key nunca debe llegar al bundle del cliente. Preferimos nombres sin
// NEXT_PUBLIC; mantenemos el fallback para no romper el deploy actual.
const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
