// src/api/students/studentApi.js
import { apiRequest } from "../client";
import Cookies from "js-cookie";
import { BASE_URL } from "../apiConfig";

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

// get inactive students list
export async function fetchInactiveStudents({ page = 1, search = "" } = {}) {
  let endpoint = `/admin/inactive_students.php?page=${page}`;
  if (search.trim()) {
    endpoint += `&search=${encodeURIComponent(search.trim())}`;
  }

  const result = await apiRequest(endpoint);

  return {
    students: result.students || [],
    current_page: result.current_page || page,
    total_pages: result.total_pages || 1,
    total: result.total_records || 0,
    per_page: result.per_page || 10,
  };
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
    `/students/index.php?getRulesByCourseName=${encodeURIComponent(query)}`,
  );
  return response.students || response;
}

export async function fetchAllCentersForDropdown() {
  const response = await apiRequest("/admin/centre_wise_student.php");
  // The response data contains { centers: [...], total_centers: 57 }
  return response.centers || [];
}

export function fetchCenterWiseStudents(centerId, page = 1) {
  return apiRequest(
    `/admin/centre_wise_student.php?center_id=${centerId}&page=${page}`,
  );
}

export async function exportCenterWiseStudentsCSV(centerId) {
  if (!centerId) throw new Error("Center ID is required");

  const token = Cookies.get("authToken");
  const endpoint = `/admin/centre_wise_student_export.php?center_id=${centerId}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      // Do not force application/json here so the server returns CSV
    },
  });

  if (!response.ok) {
    throw new Error(`Export failed: ${response.statusText}`);
  }

  // Return raw text instead of parsing JSON
  return await response.text();
}

export async function exportAllStudentsCSV(status = null) {
  let endpoint = `/admin/all_student_export.php`;

  // Add status filter if provided (1 for active, 0 for inactive)
  if (status !== null && (status === 1 || status === 0)) {
    endpoint += `?status=${status}`;
  }

  const token = Cookies.get("authToken");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Export failed: ${response.statusText}`);
  }

  // Return raw text for CSV download
  return await response.text();
}
