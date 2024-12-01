import { app } from "../../config/config.ts";
import { drizzle } from "npm:drizzle-orm/node-postgres";
// import postgres from "npm:postgres";
// import { users } from './models/users.ts';

// const schema = {
//     ...usersSchema
// }

export const connectionString = `postgres://${app.DB_USER}:${app.DB_PASS}@${app.DB_HOST}:${app.DB_PORT}/${app.DB_NAME}`;
export const db = drizzle(connectionString);

// const client = postgres(connectionString);
// export const db = drizzle({ client, casing: 'snake_case' });

// const result = await db.execute('select 1');

// const pool = db.$client;
// const usersCount = await db.$count(users);
// console.log(usersCount);