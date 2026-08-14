CREATE TYPE "public"."quote_status" AS ENUM('new', 'discussed', 'invoiced', 'closed');--> statement-breakpoint
CREATE TYPE "public"."shipment_status" AS ENUM('pending', 'picked_up', 'in_transit', 'at_hub', 'out_for_delivery', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(500) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"author" varchar(255) NOT NULL,
	"cover_image" text,
	"published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"origin_city" varchar(100) NOT NULL,
	"dest_city" varchar(100) NOT NULL,
	"weight_kg" numeric(10, 2) NOT NULL,
	"service_type" varchar(50) NOT NULL,
	"estimated_price" numeric(12, 2),
	"message" text,
	"status" "quote_status" DEFAULT 'new' NOT NULL,
	"final_price" numeric(12, 2),
	"payment_details" text,
	"invoice_number" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"tracking_id" varchar(20) NOT NULL,
	"user_id" integer,
	"sender_name" varchar(255) NOT NULL,
	"sender_phone" varchar(50) NOT NULL,
	"sender_address" text NOT NULL,
	"recipient_name" varchar(255) NOT NULL,
	"recipient_phone" varchar(50) NOT NULL,
	"recipient_address" text NOT NULL,
	"origin_city" varchar(100) NOT NULL,
	"origin_country" varchar(100) NOT NULL,
	"dest_city" varchar(100) NOT NULL,
	"dest_country" varchar(100) NOT NULL,
	"weight_kg" numeric(10, 2) NOT NULL,
	"service_type" varchar(50) NOT NULL,
	"status" "shipment_status" DEFAULT 'pending' NOT NULL,
	"estimated_delivery" timestamp,
	"actual_delivery" timestamp,
	"price_kes" numeric(12, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shipments_tracking_id_unique" UNIQUE("tracking_id")
);
--> statement-breakpoint
CREATE TABLE "tracking_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"shipment_id" integer NOT NULL,
	"status" "shipment_status" NOT NULL,
	"location" varchar(255),
	"description" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"password_hash" text NOT NULL,
	"role" varchar(20) DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE no action ON UPDATE no action;