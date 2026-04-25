// src/api/center/centerApi.jsx
import Cookies from "js-cookie";
import { apiRequest } from "../client";
import { BASE_URL } from "../apiConfig";

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

// center panel's payments api
const FEES_ENDPOINT = "/centers/center_fees.php";
export function submitCenterPayment(paymentData) {
  return apiRequest(FEES_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
}

export function fetchCenterFees() {
  return apiRequest(FEES_ENDPOINT);
}

export function fetchAdminFees() {
  return apiRequest(ADMIN_FEES);
}

// Export centers - Independent function that doesn't use apiRequest
export async function exportCentersCSV(status = null) {
  let endpoint = `/admin/export_centers.php`;

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
