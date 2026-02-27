// src / api / courses / courseApi.js;
import { apiRequest } from "../client";

const ENDPOINT = "/course/index.php";

export function fetchCourses(facultyId) {
  if (!facultyId) {
    throw new Error("Faculty ID is required");
  }

  return apiRequest(`${ENDPOINT}?type=course&faculty_id=${facultyId}`);
}

export function fetchAllCourses() {
  return apiRequest(`${ENDPOINT}?type=course`);
}

export function fetchCoursesById(courseId) {
  if (!courseId) {
    throw new Error("Course id required");
  }
  return apiRequest(`${ENDPOINT}?type=course&id=${courseId}`);
}

export function createCourse({ facultyId, name, duration, durationType }) {
  if (!facultyId) throw new Error("Faculty ID is required");
  if (!name?.trim()) throw new Error("Course name is required");
  if (!duration) throw new Error("Duration is required");
  if (!durationType) throw new Error("Duration type is required");

  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "course",
      name: name.trim(),
      duration,
      duration_type: durationType,
      faculty_id: facultyId,
    }),
  });
}

export async function updateCourse({
  id,
  facultyId,
  name,
  duration,
  durationType,
}) {
  if (!id) throw new Error("Course ID required");
  if (!name?.trim()) throw new Error("Course name required");

  return apiRequest("/course/index.php", {
    method: "PUT",
    body: JSON.stringify({
      type: "course",
      id,
      faculty_id: facultyId,
      name: name.trim(),
      duration,
      duration_type: durationType,
    }),
  });
}

export function deleteCourse(id) {
  if (!id) {
    throw new Error("Course ID is required");
  }

  return apiRequest(ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "course",
      id: String(id),
    }),
  });
}
