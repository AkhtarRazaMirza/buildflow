import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.js";

export const tasksTable = pgTable("tasks", {
  id: uuid().primaryKey().defaultRandom(),

  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id),

  title: varchar({ length: 255 }).notNull(),

  description: text(),

  status: varchar({ length: 50 })
    .default("todo")
    .notNull(),

  priority: varchar({ length: 20 })
    .default("medium"),

  due_date: timestamp(),

  created_at: timestamp()
    .defaultNow()
    .notNull(),

  updated_at: timestamp()
    .defaultNow()
    .notNull(),
});;
