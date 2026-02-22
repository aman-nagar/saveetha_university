// src/api/client.js

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const contentType = res.headers.get("content-type");

  // If not JSON (rare case)
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const json = await res.json();

  // Some endpoints may not return success flag (like settings)
  if (json.success === false) {
    throw new Error(json.message || "Request failed");
  }

  return json.data ?? json;
}
