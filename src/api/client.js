// src/api/client.js
import Cookies from "js-cookie";

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const token = Cookies.get("authToken");
  const headers = { ...options.headers };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 1. Parse JSON safely
  const contentType = response.headers.get("content-type");
  let json = null;
  if (contentType && contentType.includes("application/json")) {
    json = await response.json();
  }

  // 2. Handle 401 Unauthorized / Forbidden (Token Expired or Invalid)
  if (response.status === 401) {
    const isAuthPage =
      window.location.pathname.includes("login") ||
      window.location.pathname === "/portal";
    const backendError = json?.message || json?.errors || "Unauthorized access";

    // ✅ ALWAYS clear session when not on auth page
    if (!isAuthPage) {
      console.error("❌ SESSION EXPIRED:", backendError);
      Cookies.remove("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/portal";
    }
    
    throw new Error(backendError);
  }

  // 3. Handle 422 and other HTTP Errors (CRITICAL FIX HERE)
  if (!response.ok) {
    // If backend provides a specific message or error array, use it
    const errorMessage =
      json?.message ||
      (Array.isArray(json?.errors) ? json.errors[0] : null) ||
      `Error ${response.status}: ${response.statusText}`;

    throw new Error(errorMessage);
  }

  // 4. Handle Logical Errors (Status 200 but success: false)
  if (json && json.success === false) {
    const logicalError =
      json.message ||
      (Array.isArray(json.errors) ? json.errors[0] : "Request failed");
    throw new Error(logicalError);
  }

  // 5. Return Clean Data
  return json?.data ?? json;
}
