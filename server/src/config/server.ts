import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoutes } from "../routes/auth.routes.js";
import { chatRoutes } from "../routes/chat.routes.js";
import { projectRoutes } from "../routes/project.routes.js";
import { activityRoutes } from "../routes/activity.routes.js";
import taskRoutes from "../routes/task.routes.js";
import dashboardRoutes from "../routes/dashboard.routes.js";
import workspaceRoutes from "../routes/workspace.routes.js";


export function createApp() {
    const app = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    }));

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/activities", activityRoutes);
    app.use("/api/tasks", taskRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/workspace", workspaceRoutes);

    
    // Health check
    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok" });
    });

    return app;
}
