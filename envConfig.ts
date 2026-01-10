import { loadEnvConfig } from "@next/env";

import z from "zod";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const envSchema = z.object({
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_DB: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_ENABLE_SSL: z.string().transform((s) => s === "true"),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM_EMAIL: z.string(),

  NEXTAUTH_SECRET: z.string(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success)
  throw new Error(
    `Não foi possível carregar as variáveis de ambiente: ${error}`,
    { cause: process.env }
  );

const env = data;
export { env };
