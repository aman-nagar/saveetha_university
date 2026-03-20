// src/api/settingsApi.js
import { apiRequest } from "../client";

const ENDPOINT = "/settings/";

export function fetchSiteSettings() {
  return apiRequest(ENDPOINT);
}

export function updateSiteSettings(formData) {
  return apiRequest(ENDPOINT, {
    method: "POST",
    body: formData,
  });
}
