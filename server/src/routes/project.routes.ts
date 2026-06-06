import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = Router();
const projectController = new ProjectController();

router.post("/", verifyAccessToken, (req, res) => projectController.createProject(req, res));
router.get("/", verifyAccessToken, (req, res) => projectController.getProjects(req, res));
router.get("/:id", verifyAccessToken, (req, res) => projectController.getProjectById(req, res));

export const projectRoutes = router;
