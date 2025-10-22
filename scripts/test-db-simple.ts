// scripts/test-db-simple.ts
import { config } from 'dotenv';

config({ path: '.env.local' });

import { db } from '../lib/db';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await db.execute('SELECT 1');
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();
