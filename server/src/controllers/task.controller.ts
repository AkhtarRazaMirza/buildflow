import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";

const taskService = new TaskService();

const getStringParam = (
  param: string | string[] | undefined
): string | null => {
  if (!param || Array.isArray(param)) {
    return null;
  }

  return param;
};

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const task = await taskService.createTask(req.body);

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const getTasksByProject = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = getStringParam(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Invalid projectId",
      });
    }

    const tasks = await taskService.getTasksByProject(projectId);

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getStringParam(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getStringParam(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const task = await taskService.updateTask(id, req.body);

    return res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getStringParam(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    await taskService.deleteTask(id);

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};