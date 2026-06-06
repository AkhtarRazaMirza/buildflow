import { pgTable, uuid, varchar, jsonb, text, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.js";

export const activitiesTable = pgTable("activities", {
  id: uuid().primaryKey().defaultRandom(),

  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id),

  tool_name: varchar({ length: 255 }).notNull(),

  arguments: jsonb().notNull(),

  result: jsonb(),

  status: varchar({ length: 50 }).default("success"),

  error_message: text(),

  created_at: timestamp().defaultNow().notNull(),
});
