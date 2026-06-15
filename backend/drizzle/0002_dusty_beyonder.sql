CREATE TYPE "public"."currency" AS ENUM('INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'SGD', 'AED');--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "currency" "currency" DEFAULT 'INR' NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "currency" "currency" DEFAULT 'INR' NOT NULL;--> statement-breakpoint
ALTER TABLE "recurring_expenses" ADD COLUMN "currency" "currency" DEFAULT 'INR' NOT NULL;