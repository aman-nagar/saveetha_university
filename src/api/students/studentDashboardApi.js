// src/api/students/studentDashboardApi.js
import { apiRequest } from "../client";

/**
 * Get admit card details for the logged-in student
 * Includes exam schedule and subject information
 */

export async function getAdmitCard() {
  const endpoint = "/student-dashboard/get-admit-card.php";

  return await apiRequest(endpoint, {
    method: "GET",
  });
}

/**
 * Get student results
 */
export async function getStudentResults() {
  const endpoint = "/student-dashboard/get-results.php";

  return await apiRequest(endpoint, {
    method: "GET",
  });
}

/**
 * Get student attendance
 */
export async function getStudentAttendance() {
  const endpoint = "/student-dashboard/get-attendance.php";

  return await apiRequest(endpoint, {
    method: "GET",
  });
}
