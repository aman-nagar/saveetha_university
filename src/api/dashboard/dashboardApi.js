// src/api/dashboard/dashboardApi.js
import { apiRequest } from "../client";

// https://api.nsprowebtech.com/backend/api/v1/admin/dashboard.php

export function fetchAdminDashboard(formData) {
  return apiRequest("/admin/dashboard.php");
}
