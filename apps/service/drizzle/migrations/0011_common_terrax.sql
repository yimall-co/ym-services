CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"target_id" uuid NOT NULL,
	"target_type" text NOT NULL,
	"is_edited" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comments_target_id_index" ON "comments" USING btree ("target_id");--> statement-breakpoint
CREATE INDEX "comments_target_type_index" ON "comments" USING btree ("target_type");