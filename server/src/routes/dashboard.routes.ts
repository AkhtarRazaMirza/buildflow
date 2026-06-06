import { Router } from "express";

import {
  dashboardController,
} from "../controllers/dashboard.controller.js";

import {
  verifyAccessToken,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  verifyAccessToken,
  (req, res) =>
    dashboardController.getDashboard(
      req,
      res
    )
);

export default router;