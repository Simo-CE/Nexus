import { /* integer, */ pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "@helpers/db/column.ts";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
    // cityId: integer('city_id').references(() => cities.id)
    ...timestamps
});