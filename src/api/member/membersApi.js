import { apiRequest } from "../client";

const MEMBER_ENDPOINT = "/admin/member/index.php";

function extractMemberRecords(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.records)) return response.records;
  if (Array.isArray(response?.members)) return response.members;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export async function fetchMembers({ page = 1, search = "" } = {}) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (search.trim()) params.append("search", search.trim());

  const query = params.toString();
  const response = await apiRequest(
    `${MEMBER_ENDPOINT}${query ? `?${query}` : ""}`,
  );

  const records = extractMemberRecords(response);
  const total = Number(response?.total ?? records.length ?? 0);
  const parsedLimit = Number(response?.limit ?? records.length ?? 10);

  return {
    records,
    total,
    page: Number(response?.page ?? page),
    limit: parsedLimit > 0 ? parsedLimit : 10,
  };
}

export async function createMember(payload) {
  return apiRequest(MEMBER_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMember(payload) {
  return apiRequest(MEMBER_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteMember(id) {
  return apiRequest(MEMBER_ENDPOINT, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

const INACTIVE_CENTERS_ENDPOINT = "/member-dashboard/inactive-centers.php";

export async function fetchMemberInactiveCenters({ page = 1, search = "" } = {}) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (search && search.trim()) params.append("search", search.trim());

  const query = params.toString();
  const response = await apiRequest(
    `${INACTIVE_CENTERS_ENDPOINT}${query ? `?${query}` : ""}`,
  );

  // Response is normalized by apiRequest (json?.data ?? json)
  const centerList = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : [];

  return {
    data: centerList,
    current_page: Number(response?.current_page ?? page),
    per_page: Number(response?.per_page ?? centerList.length ?? 10),
    total_records: Number(response?.total_records ?? centerList.length ?? 0),
    total_pages: Number(response?.total_pages ?? Math.ceil((response?.total_records || centerList.length || 1) / (response?.per_page || 10))),
    search: response?.search ?? search,
  };
}

// Uses the member-authorized endpoint so the backend can enforce member scope.
export function activateMemberCenter(id) {
  if (!id) throw new Error("Center ID is required");

  return apiRequest(INACTIVE_CENTERS_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({ id, is_active: 1 }),
  });
}

const INACTIVE_STUDENTS_ENDPOINT = "/member-dashboard/inactive-students.php";

export async function fetchMemberInactiveStudents({ page = 1, search = "" } = {}) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (search && search.trim()) params.append("search", search.trim());

  const query = params.toString();
  const response = await apiRequest(
    `${INACTIVE_STUDENTS_ENDPOINT}${query ? `?${query}` : ""}`,
  );

  // Response is normalized by apiRequest (json?.data ?? json)
  const studentList = Array.isArray(response?.students)
    ? response.students
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

  return {
    students: studentList,
    current_page: Number(response?.current_page ?? page),
    per_page: Number(response?.per_page ?? studentList.length ?? 10),
    total_records: Number(response?.total_records ?? studentList.length ?? 0),
    total_pages: Number(
      response?.total_pages ??
        Math.ceil(
          (response?.total_records || studentList.length || 1) /
            (response?.per_page || 10),
        ),
    ),
    search: response?.search ?? search,
  };
}

// Fetches a complete student record through the member-authorized endpoint.
export async function fetchMemberStudentById(id) {
  if (!id) throw new Error("Student ID is required");

  const response = await apiRequest(
    `${INACTIVE_STUDENTS_ENDPOINT}?id=${encodeURIComponent(id)}`,
  );

  return response?.student ?? response;
}

// Uses the member-authorized student queue endpoint for status approval.
export function activateMemberStudent(id) {
  if (!id) throw new Error("Student ID is required");

  return apiRequest(INACTIVE_STUDENTS_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({ id, status: 1 }),
  });
}

