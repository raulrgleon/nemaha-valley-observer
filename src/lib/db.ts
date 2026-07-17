import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

if (!process.env.DATABASE_URL) {
  // Allow builds/tests without a live database; queries fall back via content.ts
  process.env.DATABASE_URL =
    "postgresql://nvo:nvo@127.0.0.1:5432/nvo_newspaper?schema=public";
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
