CREATE TABLE "cart_line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"cart_id" integer NOT NULL,
	"item_name" varchar NOT NULL,
	"variant" varchar,
	"qty" integer NOT NULL,
	"amount" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "carts_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE "order_line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_name" varchar,
	"qty" integer NOT NULL,
	"amount" integer NOT NULL,
	"order_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"amount" numeric NOT NULL,
	"status" varchar DEFAULT 'pending',
	"txt_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
ALTER TABLE "cart_line_items" ADD CONSTRAINT "cart_line_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_line_items" ADD CONSTRAINT "order_line_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;