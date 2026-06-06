import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = Router();
const chatController = new ChatController();

router.post("/", verifyAccessToken, (req, res) => chatController.sendMessage(req, res));

router.get(
  "/:projectId",
  verifyAccessToken,
  (req, res) =>
    chatController.getHistory(
      req,
      res
    )
);

export const chatRoutes = router;
