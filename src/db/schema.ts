import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: uuid("user_id").primaryKey().defaultRandom(),

  org_id: uuid("org_id")
    .notNull()
    .references(() => organizations.org_id, { onDelete: "cascade" }),

  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }),
  verification_status: boolean("verification_status"),
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
    .references(() => users.user_id, { onDelete: "cascade" }),

  type: varchar("type", { length: 100 }),
  details: text("details"),

  longitude: real("longitude"),
  latitude: real("latitude"),

  created_at: timestamp("created_at"),
});
