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
  if (response.status === 401) {
    Cookies.remove("authToken");
    let redirectUrl = "/login"; // default student login

    try {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === "admin") {
          redirectUrl = "/admin/login";
        } else if (user.role === "center" || user.role === "sub-center") {
          // For center/sub-center, you may have separate login pages later
          redirectUrl = "/login"; // fallback to student for now, adjust as needed
        }
        // student remains "/login"
      }
    } catch (e) {
      // If parsing fails, ignore and keep default
    }

    localStorage.removeItem("authUser");
    window.location.href = redirectUrl;
    throw new Error("Session expired");
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
