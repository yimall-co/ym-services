CREATE TABLE "campaign_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" varchar(2000),
	"item_type" text NOT NULL,
	"target_type" text NOT NULL,
	"target_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"mobile_image_url" text,
	"background_color" text,
	"cta_text" text,
	"cta_url" text,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL,
	"priority" smallint DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"campaign_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text NOT NULL,
	"campaign_type" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL,
	"priority" smallint DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid NOT NULL,
	CONSTRAINT "campaigns_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "reactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'like' NOT NULL,
	"target_id" uuid NOT NULL,
	"target_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "campaign_items" ADD CONSTRAINT "campaign_items_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "campaign_items_title_index" ON "campaign_items" USING btree ("title");--> statement-breakpoint
CREATE INDEX "campaign_items_item_type_index" ON "campaign_items" USING btree ("item_type");--> statement-breakpoint
CREATE INDEX "campaign_items_target_type_index" ON "campaign_items" USING btree ("target_type");--> statement-breakpoint
CREATE INDEX "campaign_items_target_id_index" ON "campaign_items" USING btree ("target_id");--> statement-breakpoint
CREATE INDEX "campaign_items_start_date_index" ON "campaign_items" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "campaign_items_end_date_index" ON "campaign_items" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "reactions_target_id_index" ON "reactions" USING btree ("target_id");--> statement-breakpoint
CREATE INDEX "reactions_target_type_index" ON "reactions" USING btree ("target_type");--> statement-breakpoint
CREATE INDEX "workspace_members_workspace_id_index" ON "workspace_members" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "workspace_members_user_id_index" ON "workspace_members" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_members_workspace_id_user_id_index" ON "workspace_members" USING btree ("workspace_id","user_id");