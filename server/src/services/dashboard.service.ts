import { projectService } from "./project.service.js";

export class DashboardService {
  async getDashboard(userId: string) {
    const projects =
      await projectService.getProjects(userId);

    return {
      stats: {
        totalProjects: projects.length,
      },

      recentProjects: projects.slice(0, 5),

      latestProject:
        projects.length > 0
          ? projects[0]
          : null,
    };
  }
}

export const dashboardService =
  new DashboardService();