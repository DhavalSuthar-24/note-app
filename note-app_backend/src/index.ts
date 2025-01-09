import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { prisma, initializeDatabase } from './connection/prismaClient';
import { appRouter } from './routes/appRoute';

const createContext = ({ req, res }: any) => ({});

const t = initTRPC.context().create();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

const PORT = process.env.PORT;

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((e: unknown) => {
  console.error('Failed to start server:', e);
});