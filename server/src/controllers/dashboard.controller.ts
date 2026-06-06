import type { Response } from "express";

import type { AuthRequest }
  from "../middleware/auth.middleware.js";

import { dashboardService }
  from "../services/dashboard.service.js";

export class DashboardController {
  async getDashboard(
    req: AuthRequest,
    res: Response
  ) {
    try {
      if (!req.userId) {
        res.status(401).json({
          error: "Unauthorized",
        });

        return;
      }

      const dashboard =
        await dashboardService.getDashboard(
          req.userId
        );

      res.status(200).json(
        dashboard
      );
    } catch (error) {
      res.status(500).json({
        error:
          (error as Error).message,
      });
    }
  }
}

export const dashboardController =
  new DashboardController();