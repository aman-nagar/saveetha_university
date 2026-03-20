// src/api/settings/settingAPI.js
import { apiRequest } from "../client";

// ============================================
// CORE SETTINGS (Basic Info + Branding)
// ============================================
export function fetchCoreSettings() {
  // TODO: Replace with actual endpoint: /settings/core
  return apiRequest("/settings/");
}

export function updateCoreSettings(formData) {
  // TODO: Replace with actual endpoint: /settings/core (POST)
  return apiRequest("/settings/", {
    method: "POST",
    body: formData,
  });
}

// Backward compatibility (existing code)
export function fetchSiteSettings() {
  return fetchCoreSettings();
}

export function updateSiteSettings(formData) {
  return updateCoreSettings(formData);
}

// ============================================
// HEADER SETTINGS
// ============================================
export function fetchHeaderSettings() {
  // TODO: Replace with actual endpoint: /settings/header
  return apiRequest("/settings/header");
}

export function updateHeaderSettings(data) {
  // TODO: Replace with actual endpoint: /settings/header (POST/PUT)
  return apiRequest("/settings/header", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ============================================
// FOOTER SETTINGS
// ============================================
export function fetchFooterSettings() {
  // TODO: Replace with actual endpoint: /settings/footer
  return apiRequest("/settings/footer");
}

export function updateFooterSettings(data) {
  // TODO: Replace with actual endpoint: /settings/footer (POST/PUT)
  return apiRequest("/settings/footer", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ============================================
// TESTIMONIALS (CRUD)
// ============================================
export function fetchTestimonials() {
  // TODO: Replace with actual endpoint: /settings/testimonials
  return apiRequest("/settings/testimonials");
}

export function createTestimonial(data) {
  // TODO: Replace with actual endpoint: /settings/testimonials (POST)
  return apiRequest("/settings/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTestimonial(id, data) {
  // TODO: Replace with actual endpoint: /settings/testimonials/{id} (PUT)
  return apiRequest(`/settings/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteTestimonial(id) {
  // TODO: Replace with actual endpoint: /settings/testimonials/{id} (DELETE)
  return apiRequest(`/settings/testimonials/${id}`, {
    method: "DELETE",
  });
}

// ============================================
// NEWS & UPDATES (CRUD)
// ============================================
export function fetchNews() {
  // TODO: Replace with actual endpoint: /settings/news
  return apiRequest("/settings/news");
}

export function createNews(data) {
  // TODO: Replace with actual endpoint: /settings/news (POST)
  return apiRequest("/settings/news", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateNews(id, data) {
  // TODO: Replace with actual endpoint: /settings/news/{id} (PUT)
  return apiRequest(`/settings/news/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteNews(id) {
  // TODO: Replace with actual endpoint: /settings/news/{id} (DELETE)
  return apiRequest(`/settings/news/${id}`, {
    method: "DELETE",
  });
}

// ============================================
// SLIDERS & CAROUSELS (CRUD)
// ============================================
export function fetchSliders() {
  // TODO: Replace with actual endpoint: /settings/sliders
  return apiRequest("/settings/sliders");
}

export function createSlider(formData) {
  // TODO: Replace with actual endpoint: /settings/sliders (POST)
  return apiRequest("/settings/sliders", {
    method: "POST",
    body: formData,
  });
}

export function updateSlider(id, formData) {
  // TODO: Replace with actual endpoint: /settings/sliders/{id} (PUT)
  return apiRequest(`/settings/sliders/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteSlider(id) {
  // TODO: Replace with actual endpoint: /settings/sliders/{id} (DELETE)
  return apiRequest(`/settings/sliders/${id}`, {
    method: "DELETE",
  });
}
