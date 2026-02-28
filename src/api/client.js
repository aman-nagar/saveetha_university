import Cookies from "js-cookie";

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function apiRequest(endpoint, options = {}) {
  const token = Cookies.get("authToken");
  const headers = { ...options.headers };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData))
    headers["Content-Type"] = "application/json";

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const isAuthPage =
      window.location.pathname.includes("login") ||
      window.location.pathname === "/portal";

    // ✅ NEW: Extract the actual backend error message
    let backendError = "";
    try {
      const errorJson = await response.json();
      backendError = errorJson.message || errorJson.error || "Unauthorized";
    } catch (e) {
      backendError = "Could not parse backend error.";
    }

    // Scenario A: Logged in but forbidden
    if (token && !isAuthPage) {
      // 🕵️‍♂️ Debugging: This will show in your console
      console.error("❌ BACKEND PERMISSION ERROR:", {
        endpoint,
        backendMessage: backendError,
        status: 401,
      });

      throw new Error(
        backendError || "You don't have permission to perform this action.",
      );
    }

    // Scenario B: Actual session expiry (no token)
    if (!isAuthPage) {
      Cookies.remove("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/portal";
      throw new Error("Session expired. Please login again.");
    }

    throw new Error(backendError || "Invalid credentials.");
  }

  // ... rest of your code
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  const json = await (response.headers
    .get("content-type")
    ?.includes("application/json")
    ? response.json()
    : Promise.resolve(null));

  if (json?.success === false) {
    throw new Error(
      json.message ||
        (Array.isArray(json.errors) ? json.errors[0] : "Request failed"),
    );
  }

  return json?.data ?? json?.errors ?? json;
}
