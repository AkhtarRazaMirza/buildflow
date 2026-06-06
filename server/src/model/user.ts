import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  full_name: varchar({ length: 255 }).notNull(),

  email: varchar({ length: 255 })
    .notNull()
    .unique(),

  password_salt: varchar({ length: 255 }),

  password_hash: varchar({ length: 255 }),

  created_at: timestamp()
    .defaultNow()
    .notNull(),

  updated_at: timestamp()
    .defaultNow()
    .notNull(),
});