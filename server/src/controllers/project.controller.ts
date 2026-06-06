import type { Response } from "express";
import { projectService } from "../services/project.service.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export class ProjectController {
    public async createProject(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const project = await projectService.createProject(req.userId, req.body);

            if (!project) {
                throw new Error("Failed to create project.");
            }

            res.status(201).json({
                project,
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async getProjects(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const projects = await projectService.getProjects(req.userId);

            res.status(200).json({
                projects,
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async getProjectById(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const projectId = typeof req.params.id === "string" ? req.params.id : "";

            if (!projectId) {
                res.status(400).json({ error: "Project id is required" });
                return;
            }

            const project = await projectService.getProjectById(req.userId, projectId);

            if (!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }

            res.status(200).json({
                project,
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
