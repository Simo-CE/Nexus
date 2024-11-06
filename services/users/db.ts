import { app } from "../../config/config.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = `postgres://${app.DB_USER}:${app.DB_PASS}@${app.DB_HOST}:${app.DB_PORT}/${app.DB_NAME}`;
const client = postgres(connectionString);
export const db = drizzle({ client, casing: 'snake_case' });