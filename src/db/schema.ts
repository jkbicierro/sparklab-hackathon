import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: uuid("user_id").primaryKey(),
  org_id: uuid("org_id").references(() => organizations.org_id),
  verification_status: boolean("verification_status").default(false),
});

export const organizations = pgTable("organizations", {
  org_id: uuid("org_id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }),
  type: varchar("type", { length: 100 }),
  status: boolean("status"),
});

export const posts = pgTable("posts", {
  post_id: uuid("post_id").primaryKey().defaultRandom(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => users.user_id, {
      onDelete: "cascade",
    }),

  type: varchar("type", { length: 100 }).default("Report"),
  details: text("details"),

  longitude: doublePrecision("longitude"),
  latitude: doublePrecision("latitude"),

  image_url: text("image_url"),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const advertisements = pgTable("advertisements", {
  ads_id: uuid("ads_id").primaryKey().defaultRandom(),
  business_name: varchar("business_name", { length: 255 }),
  description: text("description"),
  image_url: text("image_url"),
  link: text("link"),

  longitude: doublePrecision("longitude"),
  latitude: doublePrecision("latitude"),

  status: boolean("status").default(true),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
