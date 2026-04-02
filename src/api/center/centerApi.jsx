// src/api/center/centerApi.jsx
import { apiRequest } from "../client";

const CENTER_ENDPOINT = "/centers/index.php";
const UPDATE_ENDPOINT = "/centers/update.php";
const DASHBOARD_ENDPOINT = "/centers/center_dashboard.php";

export function fetchCenters({ page = 1, search = "" } = {}) {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (search) params.append("search", search);
  const queryString = params.toString();
  return apiRequest(
    `${CENTER_ENDPOINT}${queryString ? "?" + queryString : ""}`,
  );
}

export function fetchCenterById(id) {
  return apiRequest(`${CENTER_ENDPOINT}?id=${id}`);
}

export function createCenter(formData) {
  return apiRequest(`${CENTER_ENDPOINT}`, {
    method: "POST",
    body: formData,
  });
}

export function updateCenter(formData) {
  return apiRequest(`${UPDATE_ENDPOINT}`, {
    method: "POST",
    body: formData,
  });
}

// NEW: For Status Toggle (JSON via PUT)
export function toggleCenterStatus(data) {
  return apiRequest(`${CENTER_ENDPOINT}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deleteCenter(id) {
  return apiRequest(`${CENTER_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export function fetchCenterDashboard() {
  return apiRequest(`${DASHBOARD_ENDPOINT}`);
}
