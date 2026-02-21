// src/api/courseTypeApi.js

import { apiRequest } from "./client";

const COURSE_ENDPOINT = "/course/index.php";

/* -------------------------
   Fetch Course Categories
-------------------------- */
export function fetchCourseCategories() {
  return apiRequest(`${COURSE_ENDPOINT}?type=course_type`);
}

/* -------------------------
   Create Course Category
-------------------------- */
export function createCourseCategory(name) {
  const trimmed = name?.trim();

  if (!trimmed) {
    throw new Error("Category name is required");
  }

  const formData = new FormData();
  formData.append("type", "course_type");
  formData.append("name", trimmed);

  return apiRequest("/course/", {
    method: "POST",
    body: formData,
  });
}

// UPDATE Course Category
export async function updateCourseCategory(id, name) {
  if (!id) throw new Error("Category ID is required");
  if (!name?.trim()) throw new Error("Category name is required");

  return apiRequest("/course/index.php", {
    method: "PUT",
    body: JSON.stringify({
      type: "course_type",
      id,
      name: name.trim(),
    }),
  });
}
//  Delete Course Category

export function deleteCourseCategory(id) {
  if (!id) {
    throw new Error("Category ID is required");
  }

  return apiRequest(COURSE_ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "course_type",
      id: String(id),
    }),
  });
}
