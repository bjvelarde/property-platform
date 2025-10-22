// scripts/test-db.ts
import { db } from '../lib/db';
import { users } from '../lib/db/schema';

async function testDB() {
  console.log('Testing database connection...');

  try {
    const result = await db.select().from(users);
    console.log('✅ Database test successful!');
    console.log('Users found:', result.length);
    console.log('Sample user data:', result[0]);
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDB();
