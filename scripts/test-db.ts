// scripts/test-db.ts
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

import { db } from '../lib/db';

async function testConnection() {
    try {
        console.log('🧪 Testing database connection...');
        console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing');

        const result = await db.execute('SELECT 1 as connection_test');
        console.log('✅ Database connection successful!');

        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
}

testConnection().then(success => {
    process.exit(success ? 0 : 1);
});