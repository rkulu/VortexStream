import { config } from "dotenv";
import { resolve } from "path";
import { defineConfig } from "prisma/config";

config({ path: resolve(process.cwd(), ".env.local") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠ DATABASE_URL is not set. Prisma CLI will use a fallback for code generation.");
  console.warn("  Set DATABASE_URL in .env.local for database operations.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl || "postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public",
  },
});
