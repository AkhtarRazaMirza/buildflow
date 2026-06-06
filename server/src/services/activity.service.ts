import { desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { activitiesTable } from "../db/schema.js";
import type { Activity } from "../type/activity.type.js";

interface CreateActivityInput {
  projectId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  result?: Record<string, unknown>;
  status?: "success" | "failed";
  errorMessage?: string;
}

export class ActivityService {
  public async createActivity(input: CreateActivityInput): Promise<Activity> {
    const result = await db
      .insert(activitiesTable)
      .values({
        project_id: input.projectId,
        tool_name: input.toolName,
        arguments: input.arguments,
        result: input.result ?? null,
        status: input.status ?? "success",
        error_message: input.errorMessage ?? null,
      })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to create activity");
    }

    return {
      id: result[0].id,
      project_id: result[0].project_id,
      tool_name: result[0].tool_name,
      arguments: (result[0].arguments as Record<string, unknown>) ?? {},
      result: (result[0].result as Record<string, unknown>) ?? null,
      status: (result[0].status as "success" | "failed") ?? "success",
      error_message: result[0].error_message,
      created_at: result[0].created_at || new Date(),
    };
  }

  public async getProjectActivities(projectId: string, limit: number = 50): Promise<Activity[]> {
    const activities = await db
      .select()
      .from(activitiesTable)
      .where(eq(activitiesTable.project_id, projectId))
      .orderBy(desc(activitiesTable.created_at))
      .limit(limit);

    return activities.map((activity) => ({
      id: activity.id,
      project_id: activity.project_id,
      tool_name: activity.tool_name,
      arguments: (activity.arguments as Record<string, unknown>) ?? {},
      result: (activity.result as Record<string, unknown>) ?? null,
      status: (activity.status as "success" | "failed") ?? "success",
      error_message: activity.error_message,
      created_at: activity.created_at || new Date(),
    }));
  }
}

export const activityService = new ActivityService();
