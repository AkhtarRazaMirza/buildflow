import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { aiService } from "../services/ai.service.js";
import { chatService } from "../services/chat.service.js";
import { projectService } from "../services/project.service.js";
import { chatMessageInputSchema } from "../type/chat.type.js";

export class ChatController {
    public async sendMessage(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const input = await chatMessageInputSchema.parseAsync(req.body);

            const project = await projectService.getProjectById(req.userId, input.project_id);

            if (!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }

            const history = await chatService.getProjectHistory(input.project_id);

            await chatService.saveUserMessage(input.project_id, input.message);

            const aiResponse = await aiService.generateProjectResponse(project, history, input.message);

            await chatService.saveAssistantMessage(input.project_id, aiResponse.assistantMessage);

            if (aiResponse.projectMemory && !aiResponse.projectMemorySaved) {
                await projectService.updateProjectMemory(input.project_id, aiResponse.projectMemory);
            }

            const latestProject = await projectService.getProjectById(req.userId, input.project_id);

            res.status(200).json({
                project: latestProject ?? project,
                assistantMessage: aiResponse.assistantMessage,
                analysis: aiResponse.projectMemory,
                toolResults: aiResponse.toolResults,
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async getHistory(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({
                    error: "Unauthorized",
                });
                return;
            }

            const { projectId } = req.params;

            if (typeof projectId !== "string") {
                res.status(400).json({
                    error: "Invalid project ID",
                });
                return;
            }

            const project = await projectService.getProjectById(
                req.userId,
                projectId
            );

            if (!project) {
                res.status(404).json({
                    error: "Project not found",
                });
                return;
            }

            const messages = await chatService.getProjectHistory(projectId);

            res.status(200).json({
                messages,
            });
        } catch (error) {
            res.status(500).json({
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            });
        }
    }
}
