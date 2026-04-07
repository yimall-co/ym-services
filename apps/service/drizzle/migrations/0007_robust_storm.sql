ALTER TABLE "shops" DROP CONSTRAINT "shops_geolocation_id_geolocations_id_fk";
--> statement-breakpoint
ALTER TABLE "geolocations" ADD COLUMN "shop_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "geolocations" ADD CONSTRAINT "geolocations_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "geolocation_id";