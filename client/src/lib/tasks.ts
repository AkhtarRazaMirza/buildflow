import { apiCall } from "./api";

export async function getTasks(
  projectId: string
) {
  return apiCall(
    `/api/tasks/project/${projectId}`
  );
}

export async function getTask(
  taskId: string
) {
  return apiCall(
    `/api/tasks/${taskId}`
  );
}

export async function createTask(
  data: {
    project_id: string;
    title: string;
    description?: string;
    priority?: string;
  }
) {
  return apiCall("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTask(
  taskId: string,
  data: Record<string, unknown>
) {
  return apiCall(
    `/api/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteTask(
  taskId: string
) {
  return apiCall(
    `/api/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
}