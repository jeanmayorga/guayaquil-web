import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().default(""),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().default(""),
  VERCEL_URL: z.string().default(""),
  VERCEL_ENV: z.string().default("local"),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
