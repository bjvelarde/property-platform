import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log('🧪 Testing NextAuth directly...');

try {
  const nextAuth = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || 'mock-client-id-for-testing',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret-for-testing',
      }),
    ],
  });

  console.log('✅ NextAuth test successful');
  console.log('Handlers:', !!nextAuth.handlers);
  console.log('Auth:', !!nextAuth.auth);
} catch (error) {
  console.error('❌ NextAuth test failed:', error);
}
