import { load } from "jsr:@std/dotenv";

await load({
    envPath: "../config/.env.local",
    export: true,
});

export const app = {
    DB_USER: Deno.env.get("DB_USER"),
    DB_PASS: Deno.env.get("DB_PASS") || "0000",
    DB_HOST: Deno.env.get("DB_HOST") || "localhost",
    DB_NAME: Deno.env.get("DB_NAME") || "postgres",
    DB_PORT: parseInt(Deno.env.get("DB_PORT") || "5432"),
    RABBITMQ_HOST: Deno.env.get("RABBITMQ_HOSTNAME") || 'rabbitmq',
    APP_PORT: 8000
}
