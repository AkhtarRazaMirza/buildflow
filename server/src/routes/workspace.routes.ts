import { Router } from "express";

import {
  workspaceController,
} from "../controllers/workspace.controller.js";

import {
  verifyAccessToken,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/:projectId",
  verifyAccessToken,
  (req, res) =>
    workspaceController.getWorkspace(
      req,
      res
    )
);

export default router;