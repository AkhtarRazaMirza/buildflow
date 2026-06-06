import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { tasksTable } from "../model/task.js";

export class TaskService {
  async createTask(data: typeof tasksTable.$inferInsert) {
    const [task] = await db
      .insert(tasksTable)
      .values(data)
      .returning();

    return task;
  }

  async getTasksByProject(projectId: string) {
    return await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.project_id, projectId));
  }

  async getTaskById(id: string) {
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));

    return task;
  }

  async updateTask(
    id: string,
    data: Partial<typeof tasksTable.$inferInsert>
  ) {
    const [task] = await db
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning();

    return task;
  }

  async deleteTask(id: string) {
    const [task] = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();

    return task;
  }
}