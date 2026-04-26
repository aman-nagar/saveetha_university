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
