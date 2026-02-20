// src/api/facultyApi.js
import { BASE_URL } from "./config";
import { handleResponse } from "./handleResponse";

const FACULTY_URL = `${BASE_URL}/course/index.php`;

// Fetch faculty by course type
export async function fetchFaculty(courseTypeId) {
  if (!courseTypeId) {
    throw new Error("Course type is required");
  }

  const res = await fetch(
    `${FACULTY_URL}?type=faculty&course_type_id=${courseTypeId}`,
  );

  return handleResponse(res);
}

// Create faculty
export async function createFaculty(courseTypeId, name) {
  const trimmed = name?.trim();

  if (!courseTypeId) {
    throw new Error("Course type is required");
  }

  if (!trimmed) {
    throw new Error("Faculty name required");
  }

  const formData = new FormData();
  formData.append("type", "faculty");
  formData.append("course_type_id", courseTypeId);
  formData.append("name", trimmed);

  const res = await fetch(FACULTY_URL, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

// Delete faculty
export async function deleteFaculty(id) {
  if (!id) {
    throw new Error("Faculty ID required");
  }

  const res = await fetch(FACULTY_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "faculty",
      id: String(id),
    }),
  });

  return handleResponse(res);
}
