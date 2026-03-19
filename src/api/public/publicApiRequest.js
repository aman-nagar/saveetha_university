// src/api/public/publicApiRequest.js
import { BASE_URL } from "../apiConfig";

export async function publicApiRequest(endpoint, options = {}) {
  const headers = { ...options.headers };

  // Only set Content-Type if not FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Parse JSON safely
  const contentType = response.headers.get("content-type");
  let json = null;
  if (contentType && contentType.includes("application/json")) {
    try {
      json = await response.json();
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
    }
  }

  // Handle HTTP Errors
  if (!response.ok) {
    const errorMessage =
      json?.message ||
      (Array.isArray(json?.errors) ? json.errors[0] : null) ||
      `Error ${response.status}: ${response.statusText}`;

    throw new Error(errorMessage);
  }

  // Handle Logical Errors (Status 200 but success: false)
  if (json && json.success === false) {
    const logicalError =
      json.message ||
      (Array.isArray(json.errors) ? json.errors[0] : "Request failed");
    throw new Error(logicalError);
  }

  // Return clean data
  return json?.data ?? json;
}
