// src/api/studentApi.js
import { apiRequest } from "../client";

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

export async function fetchStudentById(id) {
  if (!id) throw new Error("Student ID required");
  return apiRequest(`/students/index.php?id=${id}`);
}

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
