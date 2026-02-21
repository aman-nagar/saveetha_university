// src/api/studentApi.js
import { apiRequest } from "../client";

export async function fetchStudents({ page = 1, search = "" } = {}) {
  let endpoint = `/students/?page=${page}`;

  if (search) {
    endpoint = `/students/index.php?search=${encodeURIComponent(
      search,
    )}&page=${page}`;
  }

  return apiRequest(endpoint);
}

export async function fetchStudentById(id) {
  if (!id) throw new Error("Student ID required");
  return apiRequest(`/students/index.php?id=${id}`);
}

export async function createStudent(payload) {
  return apiRequest("/students/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
