// import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

/* const env = config({ path: `./config/${Deno.env.get("ENV")}.env` });

export const app = {
    APP_PORT: env.APP_PORT || 8000,
    DB_HOST: env.DB_HOST || "localhost",
    DB_PORT: parseInt(env.DB_PORT || "5432"),
    DB_USER: env.DB_USER || "postgres",
    DB_PASS: env.DB_PASS || "password",
    DB_NAME: env.DB_NAME || "my_db",
} */

export const app = {
    DB_USER: Deno.env.get("DB_USER") || "postgres",
    DB_PASS: Deno.env.get("DB_PASS") || "0000",
    DB_HOST: Deno.env.get("DB_HOST") || "localhost",
    DB_NAME: Deno.env.get("DB_NAME") || "postgres",
    DB_PORT: parseInt(Deno.env.get("DB_PORT") || "5432"),
    APP_PORT: 8000
}