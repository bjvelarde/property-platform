import { router } from '@/lib/trpc';

import { authRouter } from './auth';

export const appRouter = router({
  auth: authRouter,
  // We'll add more routers later
  // properties: propertiesRouter,
  // users: usersRouter,
});

export type AppRouter = typeof appRouter;
