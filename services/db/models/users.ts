import { integer, pgTable, serial, text, timestamp, varchar } from 'https://deno.land/x/drizzle@v0.23.85/pg-core.ts';
import { InferModel } from 'https://deno.land/x/drizzle@v0.23.85/mod.ts';
// import { integer, pgTable, serial, text, timestamp, varchar, sql } from "drizzle-orm/pg-core";
// import { eq } from 'https://deno.land/x/drizzle/expressions.ts';
// import { relations } from "drizzle-orm/relations";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
    cityId: integer('city_id').references(() => cities.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
});

export type City = InferModel<typeof cities>;
export type NewUser = InferModel<typeof users, 'insert'>;
export type NewCity = InferModel<typeof cities, 'insert'>;

// const newUser: NewUser = {
//     fullName: 'John Doe',
//     phone: '+21264332904'
// };

/* const insertedUsers = await db.insert(users).values(newUser).returning();
const insertedUser = insertedUsers[0];

const newCity: NewCity = {
    name: 'New York',
};
const insertedCities = await db.insert(cities).values(newCity).returning();
const insertedCity = insertedCities[0]!; */

// export const usersRelations = relations(users, ({ many }) => ({
//     orders: many(orders),
// }));