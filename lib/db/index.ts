// lib/db/index.ts
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
config({ path: '.env.local' });

import * as schema from './schema';

// Use DATABASE_URL instead of SUPABASE_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set');
  throw new Error('DATABASE_URL environment variable is not set');
}

console.log('🔗 Connecting to database...');

const client = postgres(connectionString, {
  max: 1,
  idle_timeout: 20,
  ssl: 'require',
});

export const db = drizzle(client, { schema });
