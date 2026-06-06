import { and, desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { projectsTable } from "../db/schema.js";
import { createProjectInputSchema, projectMemorySchema, type ProjectMemory } from "../type/project.type.js";

export class ProjectService {
    public async createProject(userId: string, payload: unknown) {
        const input = await createProjectInputSchema.parseAsync(payload);

        const insertedProjects = await db
            .insert(projectsTable)
            .values({
                user_id: userId,
                name: input.name,
                description: input.description || null,
            })
            .returning();

        return insertedProjects[0] ?? null;
    }

    public async getProjects(userId: string) {
        return db
            .select()
            .from(projectsTable)
            .where(eq(projectsTable.user_id, userId))
            .orderBy(desc(projectsTable.created_at));
    }

    public async getProjectById(userId: string, projectId: string) {
        const projects = await db
            .select()
            .from(projectsTable)
            .where(
                and(
                    eq(projectsTable.id, projectId),
                    eq(projectsTable.user_id, userId),
                ),
            )
            .limit(1);

        return projects[0] ?? null;
    }

    public async updateProjectMemory(projectId: string, payload: ProjectMemory) {
        const memory = projectMemorySchema.parse(payload);

        const updatedProjects = await db
            .update(projectsTable)
            .set({
                project_summary: memory.projectSummary,
                goals: memory.goals,
                features: memory.features,
                timeline: memory.timeline,
                risks: memory.risks,
                tech_stack: memory.techStack,
            })
            .where(eq(projectsTable.id, projectId))
            .returning();

        return updatedProjects[0] ?? null;
    }
}

export const projectService = new ProjectService();
