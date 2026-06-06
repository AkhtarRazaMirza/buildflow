import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = Router();
const activityController = new ActivityController();

router.get(
  "/:projectId",
  verifyAccessToken,
  (req, res) => activityController.getProjectActivities(req, res)
);

export const activityRoutes = router;
