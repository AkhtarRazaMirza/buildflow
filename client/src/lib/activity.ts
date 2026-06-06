import { apiCall } from "./api";

export async function getActivities(
  projectId: string
) {
  return apiCall(
    `/api/activities/${projectId}`
  );
}