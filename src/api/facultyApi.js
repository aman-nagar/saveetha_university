// src/api/facultyApi.js

import { apiRequest } from "./client";

const ENDPOINT = "/course/index.php";

/* -------------------------
   Fetch Faculty by Course Type
-------------------------- */
export function fetchFaculty(courseTypeId) {
  if (!courseTypeId) {
    throw new Error("Course type is required");
  }

  return apiRequest(`${ENDPOINT}?type=faculty&course_type_id=${courseTypeId}`);
}

/* -------------------------
   Fetch ALL Faculty
-------------------------- */
export function fetchAllFaculty() {
  return apiRequest(`${ENDPOINT}?type=faculty`);
}

/* -------------------------
   Create Faculty
-------------------------- */
export function createFaculty(courseTypeId, name) {
  const trimmed = name?.trim();

  if (!courseTypeId) throw new Error("Course type is required");
  if (!trimmed) throw new Error("Faculty name required");

  const formData = new FormData();
  formData.append("type", "faculty");
  formData.append("course_type_id", courseTypeId);
  formData.append("name", trimmed);

  return apiRequest(ENDPOINT, {
    method: "POST",
    body: formData,
  });
}

// UPDATE Faculty
export async function updateFaculty(id, name, courseTypeId) {
  if (!id) throw new Error("Faculty ID required");
  if (!name?.trim()) throw new Error("Faculty name required");

  return apiRequest("/course/index.php", {
    method: "PUT",
    body: JSON.stringify({
      type: "faculty",
      id,
      name: name.trim(),
      course_type_id: courseTypeId,
    }),
  });
}

/* -------------------------
   Delete Faculty
-------------------------- */
export function deleteFaculty(id) {
  if (!id) throw new Error("Faculty ID required");

  return apiRequest(ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "faculty",
      id: String(id),
    }),
  });
}
