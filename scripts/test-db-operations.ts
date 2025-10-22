// scripts/test-db-operations.ts
import { config } from 'dotenv';
import { eq } from 'drizzle-orm';

import { db } from '../lib/db';
import { users, profiles } from '../lib/db/schema';
config({ path: '.env.local' });

async function testOperations() {
  try {
    console.log('🧪 Testing database operations...');

    // Test inserting a user
    const [user] = await db
      .insert(users)
      .values({
        email: 'test@example.com',
        name: 'Test User',
      })
      .returning();

    console.log('✅ User inserted:', user.id);

    // Test inserting a profile
    const [profile] = await db
      .insert(profiles)
      .values({
        userId: user.id,
        type: 'landlord',
        phone: '+1234567890',
        bio: 'Test landlord profile',
      })
      .returning();

    console.log('✅ Profile inserted:', profile.id);

    // Test querying with proper Drizzle syntax
    const result = await db.select().from(users).leftJoin(profiles, eq(profiles.userId, users.id));
    console.log('✅ Query successful, found:', result.length, 'records');

    // Clean up test data with proper syntax
    await db.delete(profiles).where(eq(profiles.userId, user.id));
    await db.delete(users).where(eq(users.id, user.id));

    console.log('✅ Test data cleaned up');
    console.log('🎉 All database operations working correctly!');

    return true;
  } catch (error) {
    console.error('❌ Database operations failed:', error);
    return false;
  }
}

testOperations().then((success) => {
  process.exit(success ? 0 : 1);
});
