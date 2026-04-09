ALTER TABLE "categories" DROP CONSTRAINT "categories_slug_unique";--> statement-breakpoint
ALTER TABLE "subcategories" DROP CONSTRAINT "subcategories_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "subcategories" DROP COLUMN "workspace_id";