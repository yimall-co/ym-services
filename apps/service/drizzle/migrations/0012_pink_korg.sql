ALTER TABLE "accounts" RENAME COLUMN "provider_id" TO "provider";--> statement-breakpoint
ALTER TABLE "offers" DROP CONSTRAINT "offers_shop_id_shops_id_fk";
--> statement-breakpoint
ALTER TABLE "offers" DROP CONSTRAINT "offers_subcategory_id_subcategories_id_fk";
--> statement-breakpoint
DROP INDEX "accounts_provider_id_index";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "gender" SET DEFAULT 'other';--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "pronoun" SET DEFAULT 'they/them';--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "scheduling_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "is_active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_subcategory_id_subcategories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "accounts_provider_index" ON "accounts" USING btree ("provider");--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "shop_id";