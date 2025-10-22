// lib/trpc/context.ts
import { auth } from '@/lib/auth-mock';

export async function createContext() {
  const session = await auth();

  return {
    session,
    user: session?.user || null,
    userId: session?.user?.id || null, // Safe access with fallback
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
