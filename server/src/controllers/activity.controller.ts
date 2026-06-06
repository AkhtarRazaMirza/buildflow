import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { activityService } from "../services/activity.service.js";
import { projectService } from "../services/project.service.js";
import { getProjectActivitiesQuerySchema } from "../type/activity.type.js";

export class ActivityController {
  public async getProjectActivities(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const projectId = req.params.projectId as string;

      const project = await projectService.getProjectById(req.userId, projectId);

      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const query = await getProjectActivitiesQuerySchema.parseAsync(req.query);

      const activities = await activityService.getProjectActivities(projectId, query.limit);

      res.status(200).json({
        activities,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
