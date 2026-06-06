import { projectService } from "./project.service.js";
import { TaskService } from "./task.service.js";
import { activityService } from "./activity.service.js";

const taskService = new TaskService();

export class WorkspaceService {
  async getWorkspace(
    userId: string,
    projectId: string
  ) {
    const project =
      await projectService.getProjectById(
        userId,
        projectId
      );

    if (!project) {
      return null;
    }

    const tasks =
      await taskService.getTasksByProject(
        projectId
      );

    const activities =
      await activityService.getProjectActivities(
        projectId,
        10
      );

    return {
      project,
      tasks,
      activities,
    };
  }
}

export const workspaceService =
  new WorkspaceService();