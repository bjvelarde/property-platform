import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table (managed by NextAuth/Supabase Auth)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  preferredLanguage: text('preferred_language').default('en'),
  countryCode: text('country_code').default('HK'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User profiles for multi-role support
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<'tenant' | 'landlord' | 'agent'>().notNull(),
  phone: text('phone'),
  countryCode: text('country_code').default('HK'),
  bio: text('bio'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Properties table
export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  landlordId: uuid('landlord_id').references(() => profiles.id),
  title: text('title').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state'),
  countryCode: text('country_code').notNull().default('HK'),
  currency: text('currency').notNull().default('HKD'),
  zipCode: text('zip_code'),
  latitude: text('latitude'),
  longitude: text('longitude'),
  propertyType: text('property_type')
    .$type<'residential' | 'commercial' | 'hospitality' | 'mixed-use'>()
    .default('residential'),
  isCommercial: boolean('is_commercial').default(false),
  rentAmount: integer('rent_amount'),
  bedroomCount: integer('bedroom_count'),
  bathroomCount: integer('bathroom_count'),
  squareFeet: integer('square_feet'),
  amenities: jsonb('amenities').$type<string[]>().default([]),
  businessName: text('business_name'), // For shops, offices, etc.
  operatingHours: text('operating_hours'), // e.g., "10:00–22:00"
  licenseNumber: text('license_number'), // For regulatory compliance
  floorNumber: text('floor_number'), // Useful for malls, hotels
  unitNumber: text('unit_number'), // e.g., "Shop 12A", "Room 305"
  images: jsonb('images').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tenant-Property relationships (junction table)
export const tenantProperties = pgTable('tenant_properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => profiles.id),
  propertyId: uuid('property_id').references(() => properties.id),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  ownedProperties: many(properties, { relationName: 'property_landlord' }),
  rentedProperties: many(tenantProperties, { relationName: 'tenant_leases' }),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  landlord: one(profiles, {
    fields: [properties.landlordId],
    references: [profiles.id],
    relationName: 'property_landlord',
  }),
  tenants: many(tenantProperties, { relationName: 'property_tenants' }),
}));

export const tenantPropertiesRelations = relations(tenantProperties, ({ one }) => ({
  tenant: one(profiles, {
    fields: [tenantProperties.tenantId],
    references: [profiles.id],
    relationName: 'tenant_leases',
  }),
  property: one(properties, {
    fields: [tenantProperties.propertyId],
    references: [properties.id],
    relationName: 'property_tenants',
  }),
}));

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles, {
  type: z.enum(['tenant', 'landlord', 'agent']),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
});

export const insertPropertySchema = createInsertSchema(properties, {
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2).max(2).optional(), // Make optional
  countryCode: z.string().length(2), // Add validation
  currency: z.string().length(3), // Add validation
  rentAmount: z.number().positive(),
  bedroomCount: z.number().int().positive(),
  bathroomCount: z.number().positive(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  propertyType: z.enum(['residential', 'commercial', 'hospitality', 'mixed-use']).optional(),
  businessName: z.string().max(100).optional(),
  operatingHours: z.string().max(100).optional(),
  licenseNumber: z.string().max(50).optional(),
  floorNumber: z.string().max(10).optional(),
  unitNumber: z.string().max(20).optional(),
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Profile = typeof profiles.$inferSelect;
export type Property = typeof properties.$inferSelect;
