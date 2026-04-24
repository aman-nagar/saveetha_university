// src/api/dashboard/dashboardApi.js
import { apiRequest } from "../client";

export function fetchAdminDashboard(formData) {
  return apiRequest("/admin/dashboard.php");
}
