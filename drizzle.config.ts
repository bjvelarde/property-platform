// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default {
    schema: './lib/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql', // Changed from 'driver' to 'dialect'
    dbCredentials: {
        url: process.env.SUPABASE_URL!, // Changed from 'connectionString' to 'url'
    },
    verbose: true,
    strict: true,
} satisfies Config;