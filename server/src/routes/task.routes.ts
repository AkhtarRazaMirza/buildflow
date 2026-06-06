import { Router } from "express";

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByProject,
  updateTask,
} from "../controllers/task.controller.js";

import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  verifyAccessToken,
  createTask
);

router.get(
  "/project/:projectId",
  verifyAccessToken,
  getTasksByProject
);

router.get(
  "/:id",
  verifyAccessToken,
  getTaskById
);

router.patch(
  "/:id",
  verifyAccessToken,
  updateTask
);

router.delete(
  "/:id",
  verifyAccessToken,
  deleteTask
);

export default router;