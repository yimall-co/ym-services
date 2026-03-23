ALTER TABLE "workspaces" ALTER COLUMN "description" SET DATA TYPE varchar(1000);--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "version" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "is_removed" boolean DEFAULT false NOT NULL;