import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in .env.local");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

let prisma: PrismaClient;

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

try {
  prisma = getPrisma();
} catch (e) {
  const err = new Error(
    "Prisma initialization failed. Check DATABASE_URL in .env.local"
  );
  if (e instanceof Error) {
    err.message += `: ${e.message}`;
  }
  throw err;
}

export { prisma };
