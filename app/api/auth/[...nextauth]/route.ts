// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth-mock';

console.log('🔐 Using mock auth handlers');

export const { GET, POST } = handlers;