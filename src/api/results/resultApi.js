// src/api/results/resultApi.js
import { apiRequest } from "../client";

// Fetch student details by enrollment for auto-fill
export const searchStudentByEnrollment = async (enrollment) => {
  return await apiRequest(
    `/results/search-student.php?enrollment=${enrollment}`,
  );
};

// Fetch existing results for a student to check for duplicates
export const fetchStudentResults = async (enrollment) => {
  return await apiRequest(
    `/results/student-results.php?enrollment=${enrollment}`,
  );
};

// Submit new result
export const createResult = async (resultData) => {
  return await apiRequest("/results/create.php", {
    method: "POST",
    body: JSON.stringify(resultData),
  });
};

// Delete a result
export const deleteResult = async (id) => {
  return await apiRequest(`/results/delete.php?id=${id}`, { method: "DELETE" });
};
