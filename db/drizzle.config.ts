import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./schema.ts",
  dbCredentials: {
    url: 'postgres://postgres:0000@localhost:5432/nest'!,
  },
});