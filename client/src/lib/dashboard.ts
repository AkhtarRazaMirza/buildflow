import { apiCall } from "./api";

export async function getDashboard() {
  return apiCall(
    "/api/dashboard"
  );
}