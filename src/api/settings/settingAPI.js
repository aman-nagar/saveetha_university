// src/api/settingsApi.js
import { apiRequest } from "../client";

const ENDPOINT = "/settings/";

/* -------------------------
   Fetch Site Settings
-------------------------- */
export function fetchSiteSettings() {
  return apiRequest(ENDPOINT);
}

/* -------------------------
   Update Site Settings
-------------------------- */
export function updateSiteSettings(formData) {
  return apiRequest(ENDPOINT, {
    method: "POST",
    body: formData,
  });
}
