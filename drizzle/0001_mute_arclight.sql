ALTER TABLE "properties" ALTER COLUMN "state" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "country_code" text DEFAULT 'HK';--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "country_code" text DEFAULT 'HK' NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "currency" text DEFAULT 'HKD' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "preferred_language" text DEFAULT 'en';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country_code" text DEFAULT 'HK';