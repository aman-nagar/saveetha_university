// src/api/courseApi.js
import { BASE_URL } from "./config";
import { handleResponse } from "./handleResponse";

const COURSE_LIST_URL = `${BASE_URL}/course/index.php?type=course_type`;

const COURSE_CREATE_URL = `${BASE_URL}/course/`;

const COURSE_DELETE_URL = `${BASE_URL}/course/index.php`;

// Fetch all course categories
export async function fetchCourseCategories() {
  const res = await fetch(COURSE_LIST_URL);
  return handleResponse(res);
}

// Create a new course category
export async function createCourseCategory(name) {
  const trimmed = name?.trim();

  if (!trimmed) {
    throw new Error("Category name is required");
  }

  const formData = new FormData();
  formData.append("type", "course_type");
  formData.append("name", trimmed);

  const res = await fetch(COURSE_CREATE_URL, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

// Delete a course category
export async function deleteCourseCategory(id) {
  if (!id) {
    throw new Error("Category ID is required");
  }

  const res = await fetch(COURSE_DELETE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "course_type",
      id: String(id),
    }),
  });

  return handleResponse(res);
}
