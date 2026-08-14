import { pgTable, text, varchar, timestamp, integer, numeric, boolean, serial, pgEnum } from "drizzle-orm/pg-core";

export const shipmentStatusEnum = pgEnum("shipment_status", [
  "pending", "picked_up", "in_transit", "at_hub", "out_for_delivery", "delivered", "cancelled"
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shipments = pgTable("shipments", {
  id: serial("id").primaryKey(),
  trackingId: varchar("tracking_id", { length: 20 }).notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  senderName: varchar("sender_name", { length: 255 }).notNull(),
  senderPhone: varchar("sender_phone", { length: 50 }).notNull(),
  senderAddress: text("sender_address").notNull(),
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  recipientPhone: varchar("recipient_phone", { length: 50 }).notNull(),
  recipientAddress: text("recipient_address").notNull(),
  originCity: varchar("origin_city", { length: 100 }).notNull(),
  originCountry: varchar("origin_country", { length: 100 }).notNull(),
  destCity: varchar("dest_city", { length: 100 }).notNull(),
  destCountry: varchar("dest_country", { length: 100 }).notNull(),
  weightKg: numeric("weight_kg", { precision: 10, scale: 2 }).notNull(),
  serviceType: varchar("service_type", { length: 50 }).notNull(),
  status: shipmentStatusEnum("status").notNull().default("pending"),
  estimatedDelivery: timestamp("estimated_delivery"),
  actualDelivery: timestamp("actual_delivery"),
  priceKes: numeric("price_kes", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const trackingEvents = pgTable("tracking_events", {
  id: serial("id").primaryKey(),
  shipmentId: integer("shipment_id").references(() => shipments.id).notNull(),
  status: shipmentStatusEnum("status").notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const quoteStatusEnum = pgEnum("quote_status", [
  "new", "discussed", "invoiced", "closed"
]);

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  originCity: varchar("origin_city", { length: 100 }).notNull(),
  destCity: varchar("dest_city", { length: 100 }).notNull(),
  weightKg: numeric("weight_kg", { precision: 10, scale: 2 }).notNull(),
  serviceType: varchar("service_type", { length: 50 }).notNull(),
  estimatedPrice: numeric("estimated_price", { precision: 12, scale: 2 }),
  message: text("message"),
  status: quoteStatusEnum("status").notNull().default("new"),
  finalPrice: numeric("final_price", { precision: 12, scale: 2 }),
  paymentDetails: text("payment_details"),
  invoiceNumber: varchar("invoice_number", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  coverImage: text("cover_image"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
