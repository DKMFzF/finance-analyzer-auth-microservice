import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * переменное окружение
 */

const configSchema = z.object({
  PORT: z.string().default("3000"),
  SECRET_KEY: z.string().default("supersecret"), // TODO: потом убрать
  USER_SERVICE_URL: z.string().url(),
  USER_SERVICE_URL_CHECK_USER: z.string().default("/check-user"),
  USER_SERVICE_URL_LOGIN: z.string().default("/login"),
  USER_SERVICE_URL_PROTECTED: z.string().default("/protected"),
});

const envConfig = configSchema.safeParse(process.env);

if (!envConfig.success) {
  console.error("Invalid environment variables:", envConfig.error.format());
  process.exit(1);
}

export const config = envConfig.data;
