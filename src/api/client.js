// src/api/client.js
import Cookies from "js-cookie";

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const token = Cookies.get("authToken");

  const headers = {
    ...options.headers,
  };

  // Attach token globally
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set JSON header if NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 🔥 Global 401 handler – redirect based on role
  // 🔥 Fixed Global 401 handler
  if (response.status === 401) {
    Cookies.remove("authToken");
    localStorage.removeItem("authUser");

    // Force a clean redirect to the portal for everyone
    window.location.href = "/portal";
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const json = await response.json();

  if (json.success === false) {
    // Support both message and errors keys for flexible backend responses
    const errorMsg =
      json.message ||
      (Array.isArray(json.errors) ? json.errors[0] : "Request failed");
    throw new Error(errorMsg);
  }

  return json.data ?? json.errors ?? json;
}
