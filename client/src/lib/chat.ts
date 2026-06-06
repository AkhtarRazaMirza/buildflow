import { apiCall } from "./api";

export async function getProjectHistory(
  projectId: string
) {
  return apiCall(
    `/api/chat/${projectId}`
  );
}

export async function sendMessage(
  projectId: string,
  message: string
) {
  return apiCall("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      project_id: projectId,
      message,
    }),
  });
}