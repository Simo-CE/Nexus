import { defineConfig } from "drizzle-kit";
import { connectionString } from "../services/users/db.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "../services/db/models/users.ts",
  dbCredentials: {
    url: connectionString!,
  },
});