import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function initializeDatabase() {
  await prisma.$executeRaw`
  CREATE TABLE IF NOT EXISTS "Note" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
  );`;
}
  
  export { prisma, initializeDatabase };