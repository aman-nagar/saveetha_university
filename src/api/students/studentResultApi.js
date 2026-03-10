// src/api/students/studentResultApi.js
import { apiRequest } from "../client";

const RESULT_ENDPOINT = "/student-dashboard/get-result.php";

/**
 * Fetch student's academic results/transcript
 * Returns all semesters/years of results for the logged-in student
 *
 * @returns {Promise} Result data including subjects, marks, etc.
 */
export const fetchStudentResults = async () => {
  try {
    const response = await apiRequest(RESULT_ENDPOINT);
    return response;
  } catch (err) {
    console.error("Student Result Fetch Error:", err);
    throw new Error(
      err.message || "Failed to fetch your academic results. Please try again.",
    );
  }
};
