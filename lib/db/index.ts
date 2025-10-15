// lib/db/index.ts
import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.SUPABASE_URL;

if (!connectionString) {
    console.error('❌ SUPABASE_URL is not set');
    throw new Error('SUPABASE_URL environment variable is not set');
}

console.log('🔗 Connecting to Southeast Asia Supabase...');

const client = postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    ssl: 'require', // Important for Supabase
});

export const db = drizzle(client, { schema });