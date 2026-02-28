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

  if (response.status === 401) {
    const isAuthPage =
      window.location.pathname.includes("login") ||
      window.location.pathname === "/portal";
    if (token) {
      throw new Error("You don't have permission to access this resource.");
    }

    // No token means actual session expiry
    if (!isAuthPage) {
      Cookies.remove("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/portal";
      throw new Error("Session expired. Please login again.");
    }

    // If on a login page, just throw the error for the UI to catch
    throw new Error("Invalid credentials or access denied.");
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
