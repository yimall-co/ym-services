CREATE TABLE "profiles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"gender" text,
	"custom_gender" text,
	"pronouns" text,
	"custom_pronouns" text,
	"birthdate" date,
	"news_letter" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;