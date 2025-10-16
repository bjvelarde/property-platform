// lib/test-nextauth.js
import NextAuth from 'next-auth';
const GoogleProvider = require('next-auth/providers/google').default;

console.log('🧪 Testing NextAuth directly...');

try {
    const nextAuth = NextAuth({
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })
        ],
    });

    console.log('✅ NextAuth test successful');
    console.log('Handlers:', !!nextAuth.handlers);
    console.log('Auth:', !!nextAuth.auth);
} catch (error) {
    console.error('❌ NextAuth test failed:', error);
}