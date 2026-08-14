import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.MIGRATE_URL ?? process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is required (or MIGRATE_URL)");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
});