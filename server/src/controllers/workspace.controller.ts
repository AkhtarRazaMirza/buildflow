import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import { workspaceService }
  from "../services/workspace.service.js";

export class WorkspaceController {
  async getWorkspace(
    req: AuthRequest,
    res: Response
  ) {
    try {
      if (!req.userId) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const projectId =
        req.params.projectId as string;

      const workspace =
        await workspaceService.getWorkspace(
          req.userId,
          projectId
        );

      if (!workspace) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      return res.json(workspace);
    } catch (error) {
      return res.status(500).json({
        error:
          (error as Error).message,
      });
    }
  }
}

export const workspaceController =
  new WorkspaceController();