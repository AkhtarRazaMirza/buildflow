import { pgTable, uuid, varchar, text, json, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.js";

export const projectsTable = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),

  user_id: uuid()
    .notNull()
    .references(() => usersTable.id),

  name: varchar({ length: 255 }).notNull(),

  description: text(),

  project_summary: text(),

  tech_stack: json(),

  goals: json(),

  features: json(),

  timeline: json(),

  risks: json(),

  created_at: timestamp().defaultNow().notNull(),
});
