import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
  schema: "./server/models/*",
  out: "./drizzle",
  dbCredentials: {
    url: './sqlite.db'
  }
})