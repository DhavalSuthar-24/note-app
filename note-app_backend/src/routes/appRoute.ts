import { initTRPC } from '@trpc/server';
import { noteRouter } from './noteRoute';

const t = initTRPC.create();

export const appRouter = t.router({
  note: noteRouter,
});

export type AppRouter = typeof appRouter;
