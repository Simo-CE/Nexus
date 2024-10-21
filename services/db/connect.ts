import { app } from "../../config/config.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema.ts";
import postgres from "postgres";

const connectionString = `postgres://${app.DB_USER}:${app.DB_PASS}@${app.DB_HOST}:${app.DB_PORT}/${app.DB_NAME}`;
export const client = postgres(connectionString);
export const db = drizzle(client, { schema });


/* import postgres, { drizzle } from 'https://deno.land/x/drizzle/postgres.ts';
import { app } from "../../config/config.ts";

const connectionString = `postgres://${app.DB_USER}:${app.DB_PASS}@${app.DB_HOST}:${app.DB_PORT}/${app.DB_NAME}`;
const client = postgres(connectionString);
const db = drizzle(client); */