import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config({ path: `./config/${Deno.env.get("ENV")}.env` });

export const app = {
    APP_PORT: env.APP_PORT || 8000,
    DB_HOST: env.DB_HOST || "localhost",
    DB_PORT: parseInt(env.DB_PORT || "5432"),
    DB_USER: env.DB_USER || "postgres",
    DB_PASS: env.DB_PASS || "password",
    DB_NAME: env.DB_NAME || "my_db",
}