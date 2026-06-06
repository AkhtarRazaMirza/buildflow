import { z } from "zod";

export const activitySchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  tool_name: z.string(),
  arguments: z.record(z.string(), z.any()),
  result: z.record(z.string(), z.any()).nullable(),
  status: z.enum(["success", "failed"]),
  error_message: z.string().nullable(),
  created_at: z.date(),
});

export type Activity = z.infer<typeof activitySchema>;

export const getProjectActivitiesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type GetProjectActivitiesQuery = z.infer<typeof getProjectActivitiesQuerySchema>;
