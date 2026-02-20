// src/api/courseApi.js
const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

const COURSE_LIST_URL = `${BASE_URL}/course/index.php?type=course_type`;
const COURSE_CREATE_URL = `${BASE_URL}/course/`;
const COURSE_DELETE_URL = `${BASE_URL}/course/index.php`;

// Fetch all course categories

export async function fetchCourseCategories() {
  const res = await fetch(COURSE_LIST_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (HTTP ${res.status})`);
  }

  const json = await res.json();

  if (!json.status || !Array.isArray(json.data)) {
    throw new Error("Invalid response format from server");
  }

  return json.data;
}

// Create a new course category

export async function createCourseCategory(name) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Category name is required");

  const formData = new FormData();
  formData.append("type", "course_type");
  formData.append("name", trimmed);

  const res = await fetch(COURSE_CREATE_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Create failed (HTTP ${res.status})`);
  }

  const json = await res.json();

  if (!json.status) {
    throw new Error(json.message || "Create failed");
  }

  return json;
}

// Delete a course category
export async function deleteCourseCategory(id) {
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

  if (!res.ok) {
    throw new Error(`Delete failed (HTTP ${res.status})`);
  }

  const json = await res.json();

  if (!json.status) {
    throw new Error(json.message || "Delete failed");
  }

  return json;
}
