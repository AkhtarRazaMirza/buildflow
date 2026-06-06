import { z } from "zod";

export const createProjectInputSchema = z.object({
    name: z.string().trim().min(2).max(255),
    description: z.string().trim().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const projectMemorySchema = z.object({
    projectSummary: z.string(),
    goals: z.array(z.string()),
    features: z.array(z.string()),
    timeline: z.array(z.string()),
    risks: z.array(z.string()),
    techStack: z.array(z.string()),
});

export type ProjectMemory = z.infer<typeof projectMemorySchema>;

export const saveProjectMemoryInputSchema = projectMemorySchema.extend({
    projectId: z.string().uuid(),
});

export type SaveProjectMemoryInput = z.infer<typeof saveProjectMemoryInputSchema>;

export const projectAnlytics = projectMemorySchema;
export type ProjectAnalytics = ProjectMemory;
