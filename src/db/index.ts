import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __acefieldsPostgres?: ReturnType<typeof postgres>;
};

export const client =
  globalForDb.__acefieldsPostgres ??
  postgres(databaseUrl, {
    max: 1,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__acefieldsPostgres = client;
}

export const db = drizzle(client);