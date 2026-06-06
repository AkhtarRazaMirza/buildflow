import { apiCall } from "./api";

export async function createProject(data: {
  name: string;
  description?: string;
}) {
  return apiCall("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProjects() {
  return apiCall("/api/projects");
}

export async function getProject(id: string) {
  return apiCall(`/api/projects/${id}`);
}