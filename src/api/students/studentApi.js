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
  const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";
  let endpoint = `/students/students-recycle.php?page=${page}`;

  if (search.trim()) {
    endpoint += `&search=${encodeURIComponent(search.trim())}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();

  if (json.success === false) throw new Error(json.message || "Request failed");

  return {
    students: json.data || [],
    current_page: json.errors?.page || page,
    total_pages: json.errors?.total_pages || 1,
    total: json.errors?.total || 0,
    message: json.message,
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}
