// src/api/students/studentApi.js

import { apiRequest } from "../client";

// get all students pagination wise
export async function fetchStudents({
  page = 1,
  search = "",
  deleted = 0,
} = {}) {
  let endpoint = `/students/index.php?page=${page}&deleted=${deleted}`;

  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`;
  }

  return apiRequest(endpoint);
}

// fetch  students by id
export async function fetchStudentById(id) {
  if (!id) throw new Error("Student ID required");
  return apiRequest(`/students/index.php?id=${id}`);
}

// get recycle list
export async function getRecycleStudentsList({ page = 1, search = "" } = {}) {
  // Construct the endpoint
  let endpoint = `/students/students-recycle.php?page=${page}`;
  if (search.trim()) {
    endpoint += `&search=${encodeURIComponent(search.trim())}`;
  }

  // Use your apiRequest utility (it handles tokens and json.success checks)
  const result = await apiRequest(endpoint);

  // result is now the "data" object from your JSON:
  // { page: 1, limit: 20, total: 3, students: [...] }

  return {
    students: result.students || [], // Access the array specifically
    current_page: result.page || page,
    total_pages: result.total_pages || 1,
    total: result.total || 0,
  };
}
// create student
export async function createStudent(payload, isMultipart = false) {
  if (isMultipart) {
    return apiRequest("/students/index.php", {
      method: "POST",
      body: payload,
    });
  }

  return apiRequest("/students/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

// Update full student
export async function updateStudent(id, payload, isMultipart = false) {
  if (isMultipart) {
    return apiRequest("/students/update.php", {
      method: "POST",
      body: payload,
    });
  }

  return apiRequest("/students/update.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...payload,
    }),
  });
}

// Update student status
export async function updateStudentStatus(id, status) {
  return apiRequest("/students/update.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status,
    }),
  });
}

// Soft delete OR permanent delete (backend decides automatically)
export async function deleteStudent(id) {
  return apiRequest("/students/delete.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

// Restore from recycle bin
export async function restoreStudent(id) {
  return apiRequest("/students/restore_delete.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export async function searchEnrollment(query) {
  if (!query) return [];
  // Using your new specific search endpoint
  const response = await apiRequest(
    `/students/index.php?enrollment_search=${encodeURIComponent(query)}`,
  );
  return response.students || response;
}
