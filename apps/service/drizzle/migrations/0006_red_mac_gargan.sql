CREATE TABLE "workspace_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text,
	"user_agent" text,
	"ip_address" text,
	"locale" text,
	"visited_at" timestamp DEFAULT now(),
	"onboarding_step_reached" integer,
	"completed_onboarding" boolean DEFAULT true,
	"is_first_visit" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid,
	"visitor_id" uuid
);
--> statement-breakpoint
ALTER TABLE "customizations" ALTER COLUMN "font_primary" SET DEFAULT 'Montserrat';--> statement-breakpoint
ALTER TABLE "workspace_visits" ADD CONSTRAINT "workspace_visits_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_visits" ADD CONSTRAINT "workspace_visits_visitor_id_users_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workspace_visits_visited_at_index" ON "workspace_visits" USING btree ("visited_at");--> statement-breakpoint
CREATE INDEX "workspace_visits_is_first_visit_index" ON "workspace_visits" USING btree ("is_first_visit");--> statement-breakpoint
CREATE INDEX "workspace_visits_completed_onboarding_index" ON "workspace_visits" USING btree ("completed_onboarding");