// lib/trpc/routers/auth.ts
import { router, publicProcedure, protectedProcedure } from '@/lib/trpc';
import { z } from 'zod';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const authRouter = router({
    getSession: publicProcedure.query(async ({ ctx }) => {
        return ctx.session;
    }),

    getUser: protectedProcedure.query(async ({ ctx }) => {
        // Check if user exists before accessing properties
        if (!ctx.userId) {
            throw new Error('User not authenticated');
        }

        return {
            id: ctx.userId,
            name: ctx.user?.name || null,
            email: ctx.user?.email || null,
            image: ctx.user?.image || null,
        };
    }),

    createProfile: protectedProcedure
        .input(
            z.object({
                type: z.enum(['tenant', 'landlord', 'agent']),
                phone: z.string().optional(),
                bio: z.string().max(500).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.userId) {
                throw new Error('User not authenticated');
            }

            const [profile] = await db
                .insert(profiles)
                .values({
                    userId: ctx.userId,
                    type: input.type,
                    phone: input.phone,
                    bio: input.bio,
                })
                .returning();

            return profile;
        }),

    getProfiles: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.userId) {
            throw new Error('User not authenticated');
        }

        const userProfiles = await db
            .select()
            .from(profiles)
            .where(eq(profiles.userId, ctx.userId));

        return userProfiles;
    }),
});