ALTER TABLE "properties" ADD COLUMN "latitude" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "longitude" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "property_type" text DEFAULT 'residential';--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "is_commercial" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "business_name" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "operating_hours" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "license_number" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "floor_number" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "unit_number" text;