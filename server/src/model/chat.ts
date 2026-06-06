import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./project.js";

export const chatsTable = pgTable("chats", {
  id: uuid().primaryKey().defaultRandom(),

  project_id: uuid()
    .references(() => projectsTable.id),

  role: varchar({ length: 20 }).notNull(),

  content: text().notNull(),

  created_at: timestamp().defaultNow(),
});
