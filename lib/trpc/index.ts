import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from './context';

// Initialize tRPC with context type
const t = initTRPC.context<Context>().create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const { ctx } = opts;

  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
      userId: ctx.userId,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);
export const createCallerFactory = t.createCallerFactory;
