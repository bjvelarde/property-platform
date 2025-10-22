// scripts/check-env.ts
import { config } from 'dotenv';

config({ path: '.env.local' });

console.log('🔍 Environment Variables Check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL ? '✓ Set' : '✗ Missing');
