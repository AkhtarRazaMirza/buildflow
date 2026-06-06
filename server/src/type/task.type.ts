import { z } from "zod";

export const createTaskInputSchema = z.object({
    projectId: z.string().uuid(),
    title: z.string().trim().min(1).max(255),
    description: z.string().trim().optional(),
    status: z.string().trim().min(1).max(50).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
