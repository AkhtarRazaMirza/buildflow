import { apiCall } from "./api";

export async function getWorkspace(
  projectId: string
) {
  return apiCall(
    `/api/workspace/${projectId}`
  );
}