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

  type: varchar("type", { length: 100 }),
  details: text("details"),

  longitude: doublePrecision("longitude"),
  latitude: doublePrecision("latitude"),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
