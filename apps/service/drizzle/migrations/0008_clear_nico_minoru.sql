ALTER TABLE "shops" DROP CONSTRAINT "shops_address_id_addresses_id_fk";
--> statement-breakpoint
ALTER TABLE "shops" ALTER COLUMN "description" SET DATA TYPE varchar(2000);--> statement-breakpoint
ALTER TABLE "shops" DROP COLUMN "address_id";