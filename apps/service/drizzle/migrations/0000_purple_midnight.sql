CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"quantity" integer,
	"notes" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"client_id" text,
	"resource_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"weekday" smallint NOT NULL,
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL,
	CONSTRAINT "weekday_range" CHECK ("availabilities"."weekday" BETWEEN 0 AND 6)
);
--> statement-breakpoint
CREATE TABLE "capacity_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"capacity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"provider_id" uuid,
	"resource_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheduling_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"desired_date" date NOT NULL,
	"time_from" time with time zone NOT NULL,
	"time_to" time with time zone NOT NULL,
	"priority" smallint DEFAULT 0,
	"quantity" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"client_id" text,
	"resource_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_item_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"option_group_name" text NOT NULL,
	"option_name" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cart_item_id" uuid NOT NULL,
	"option_group_id" uuid NOT NULL,
	"option_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offer_title" text NOT NULL,
	"base_price" numeric(12, 2) NOT NULL,
	"total_price" numeric(12, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cart_id" uuid NOT NULL,
	"offer_id" uuid,
	"shop_id" uuid
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" text DEFAULT 'open',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(500),
	"banner" text,
	"position" smallint DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "subcategories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(500),
	"position" smallint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exception_time_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"exception_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exceptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"reason" varchar(500),
	"is_closed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_time_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_time" time with time zone NOT NULL,
	"end_time" time with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"schedule_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_of_week" smallint NOT NULL,
	"is_closed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"shop_id" uuid NOT NULL,
	CONSTRAINT "day_of_week_range" CHECK ("schedules"."day_of_week" BETWEEN 0 AND 6)
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"street" text NOT NULL,
	"number" text NOT NULL,
	"complement" text,
	"neighborhood" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"postal_code" varchar(20),
	"is_online" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "geolocations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"accuracy" smallint DEFAULT 5,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "latitude_range" CHECK ("geolocations"."latitude" BETWEEN -90 AND 90),
	CONSTRAINT "longitude_range" CHECK ("geolocations"."longitude" BETWEEN -180 AND 180)
);
--> statement-breakpoint
CREATE TABLE "offer_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text NOT NULL,
	"description" varchar(250),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"offer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offer_option_groups" (
	"offer_id" uuid NOT NULL,
	"option_group_id" uuid NOT NULL,
	"sort_order" smallint DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "offer_option_groups_offer_id_option_group_id_pk" PRIMARY KEY("offer_id","option_group_id")
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'product' NOT NULL,
	"scheduling_type" text,
	"duration" smallint,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(2500) NOT NULL,
	"banner" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"stock" integer DEFAULT 0,
	"discount" smallint DEFAULT 0 NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" uuid NOT NULL,
	"subcategory_id" uuid,
	"shop_id" uuid,
	"workspace_id" uuid NOT NULL,
	CONSTRAINT "discount_range" CHECK ("offers"."discount" BETWEEN 0 AND 100)
);
--> statement-breakpoint
CREATE TABLE "option_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" varchar(500),
	"required" boolean DEFAULT false,
	"min" smallint DEFAULT 0 NOT NULL,
	"max" smallint DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price_delta" numeric(12, 2) DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"option_group_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_offers" (
	"shop_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shop_offers_shop_id_offer_id_pk" PRIMARY KEY("shop_id","offer_id")
);
--> statement-breakpoint
CREATE TABLE "shops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(500),
	"banner" text,
	"phone" varchar(15),
	"is_primary" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"address_id" uuid NOT NULL,
	"geolocation_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customization_color_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"hex" text NOT NULL,
	"r" smallint DEFAULT 0 NOT NULL,
	"g" smallint DEFAULT 0 NOT NULL,
	"b" smallint DEFAULT 0 NOT NULL,
	"alpha" smallint DEFAULT 255 NOT NULL,
	"is_main" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"color_id" uuid NOT NULL,
	CONSTRAINT "r_range" CHECK ("customization_color_variants"."r" BETWEEN 0 AND 255),
	CONSTRAINT "g_range" CHECK ("customization_color_variants"."g" BETWEEN 0 AND 255),
	CONSTRAINT "b_range" CHECK ("customization_color_variants"."b" BETWEEN 0 AND 255),
	CONSTRAINT "a_range" CHECK ("customization_color_variants"."alpha" BETWEEN 0 AND 255)
);
--> statement-breakpoint
CREATE TABLE "customization_colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"customization_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"logo" text NOT NULL,
	"font_primary" text DEFAULT 'Poppins' NOT NULL,
	"font_secondary" text DEFAULT 'Raleway' NOT NULL,
	"show_name" boolean DEFAULT false NOT NULL,
	"social_media" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "segments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" varchar(250),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"tin" varchar(15),
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"segment_id" uuid NOT NULL,
	"owner_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_resource_id_scheduling_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."scheduling_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_resource_id_scheduling_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."scheduling_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "capacity_resources" ADD CONSTRAINT "capacity_resources_resource_id_scheduling_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."scheduling_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_resources" ADD CONSTRAINT "provider_resources_resource_id_scheduling_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."scheduling_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduling_resources" ADD CONSTRAINT "scheduling_resources_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_resource_id_scheduling_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."scheduling_resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_cart_item_id_cart_items_id_fk" FOREIGN KEY ("cart_item_id") REFERENCES "public"."cart_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_option_group_id_option_groups_id_fk" FOREIGN KEY ("option_group_id") REFERENCES "public"."option_groups"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item_options" ADD CONSTRAINT "cart_item_options_option_id_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."options"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exception_time_slots" ADD CONSTRAINT "exception_time_slots_exception_id_exceptions_id_fk" FOREIGN KEY ("exception_id") REFERENCES "public"."exceptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exceptions" ADD CONSTRAINT "exceptions_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_time_slots" ADD CONSTRAINT "schedule_time_slots_schedule_id_schedules_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offer_images" ADD CONSTRAINT "offer_images_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offer_option_groups" ADD CONSTRAINT "offer_option_groups_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offer_option_groups" ADD CONSTRAINT "offer_option_groups_option_group_id_option_groups_id_fk" FOREIGN KEY ("option_group_id") REFERENCES "public"."option_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_subcategory_id_subcategories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."subcategories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_option_group_id_option_groups_id_fk" FOREIGN KEY ("option_group_id") REFERENCES "public"."option_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_offers" ADD CONSTRAINT "shop_offers_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_offers" ADD CONSTRAINT "shop_offers_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_geolocation_id_geolocations_id_fk" FOREIGN KEY ("geolocation_id") REFERENCES "public"."geolocations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shops" ADD CONSTRAINT "shops_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customization_color_variants" ADD CONSTRAINT "customization_color_variants_color_id_customization_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."customization_colors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customization_colors" ADD CONSTRAINT "customization_colors_customization_id_customizations_id_fk" FOREIGN KEY ("customization_id") REFERENCES "public"."customizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customizations" ADD CONSTRAINT "customizations_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_segment_id_segments_id_fk" FOREIGN KEY ("segment_id") REFERENCES "public"."segments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "appointments_start_at_index" ON "appointments" USING btree ("start_at");--> statement-breakpoint
CREATE INDEX "appointments_status_index" ON "appointments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "availabilities_weekday_index" ON "availabilities" USING btree ("weekday");--> statement-breakpoint
CREATE INDEX "availabilities_start_time_index" ON "availabilities" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "availabilities_end_time_index" ON "availabilities" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "scheduling_resources_type_index" ON "scheduling_resources" USING btree ("type");--> statement-breakpoint
CREATE INDEX "waitlists_desired_date_index" ON "waitlists" USING btree ("desired_date");--> statement-breakpoint
CREATE INDEX "waitlists_status_index" ON "waitlists" USING btree ("status");--> statement-breakpoint
CREATE INDEX "cart_item_options_option_name_index" ON "cart_item_options" USING btree ("option_name");--> statement-breakpoint
CREATE INDEX "cart_item_options_price_index" ON "cart_item_options" USING btree ("price");--> statement-breakpoint
CREATE INDEX "cart_items_offer_title_index" ON "cart_items" USING btree ("offer_title");--> statement-breakpoint
CREATE INDEX "cart_items_quantity_index" ON "cart_items" USING btree ("quantity");--> statement-breakpoint
CREATE INDEX "carts_status_index" ON "carts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "accounts_account_id_index" ON "accounts" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "accounts_provider_id_index" ON "accounts" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_name_index" ON "users" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verification_identifier_index" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "categories_label_index" ON "categories" USING btree ("label");--> statement-breakpoint
CREATE INDEX "categories_slug_index" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "subcategories_label_index" ON "subcategories" USING btree ("label");--> statement-breakpoint
CREATE INDEX "subcategories_slug_index" ON "subcategories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "exception_time_slots_start_time_index" ON "exception_time_slots" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "exception_time_slots_end_time_index" ON "exception_time_slots" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "exceptions_date_index" ON "exceptions" USING btree ("date");--> statement-breakpoint
CREATE INDEX "schedule_time_slots_start_time_index" ON "schedule_time_slots" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "schedule_time_slots_end_time_index" ON "schedule_time_slots" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "schedules_day_of_week_index" ON "schedules" USING btree ("day_of_week");--> statement-breakpoint
CREATE INDEX "addresses_street_index" ON "addresses" USING btree ("street");--> statement-breakpoint
CREATE INDEX "addresses_city_index" ON "addresses" USING btree ("city");--> statement-breakpoint
CREATE INDEX "addresses_country_index" ON "addresses" USING btree ("country");--> statement-breakpoint
CREATE INDEX "geolocations_latitude_index" ON "geolocations" USING btree ("latitude");--> statement-breakpoint
CREATE INDEX "geolocations_longitude_index" ON "geolocations" USING btree ("longitude");--> statement-breakpoint
CREATE INDEX "offer_images_image_index" ON "offer_images" USING btree ("image");--> statement-breakpoint
CREATE INDEX "offers_title_index" ON "offers" USING btree ("title");--> statement-breakpoint
CREATE INDEX "offers_slug_index" ON "offers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "offers_start_date_index" ON "offers" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "offers_end_date_index" ON "offers" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "option_groups_name_index" ON "option_groups" USING btree ("name");--> statement-breakpoint
CREATE INDEX "options_name_index" ON "options" USING btree ("name");--> statement-breakpoint
CREATE INDEX "shops_name_index" ON "shops" USING btree ("name");--> statement-breakpoint
CREATE INDEX "shops_slug_index" ON "shops" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "customization_color_variants_code_index" ON "customization_color_variants" USING btree ("code");--> statement-breakpoint
CREATE INDEX "customization_color_variants_hex_index" ON "customization_color_variants" USING btree ("hex");--> statement-breakpoint
CREATE INDEX "customization_colors_label_index" ON "customization_colors" USING btree ("label");--> statement-breakpoint
CREATE INDEX "customization_colors_value_index" ON "customization_colors" USING btree ("value");--> statement-breakpoint
CREATE INDEX "segments_name_index" ON "segments" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "segments_slug_index" ON "segments" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "workspaces_name_index" ON "workspaces" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "workspaces_slug_index" ON "workspaces" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "workspaces_tin_index" ON "workspaces" USING btree ("tin");