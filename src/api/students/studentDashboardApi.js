// src/api/students/studentDashboardApi.js
import { apiRequest } from "../client";

export async function getAdmitCard() {
  const endpoint = "/student-dashboard/get-admit-card.php";

  return await apiRequest(endpoint, {
    method: "GET",
  });
}
