// src/api/client.js

import Cookies from "js-cookie"; 

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function apiRequest(endpoint, options = {}) {
  // Get token from cookies (if exists)
  const token = Cookies.get("authToken");

  // Prepare headers
  const headers = {
    ...options.headers,
    "Content-Type": "application/json", 
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const json = await res.json();
  
  if (json.success === false) {
    throw new Error(json.message || "Request failed");
  }

  return json.data ?? json;
}
