import { app } from "../../config/config.ts";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = `postgres://${app.DB_USER}:${app.DB_PASS}@${app.DB_HOST}:${app.DB_PORT}/${app.DB_NAME}`;

export const db = drizzle({ connection: connectionString, casing: 'snake_case' });