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
// SLIDERS & CAROUSELS
// ============================================
export function fetchSliders() {
  return apiRequest("/admin/sliders.php?admin=true");
}

export function createSlider(formData) {
  return apiRequest("/admin/sliders.php", {
    method: "POST",
    body: formData,
  });
}

export function updateSliderStatus(id, status) {
  return apiRequest("/admin/sliders.php", {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      status: status ? 1 : 0,
    }),
  });
}

export function deleteSlider(id) {
  return apiRequest(`/admin/sliders.php?id=${id}`, {
    method: "DELETE",
  });
}

// ============================================
// DOWNLOAD FORMS (CREATE & DELETE ONLY)
// ============================================
export function fetchDownloadForms() {
  return apiRequest("/admin/download-form.php");
}

export function createDownloadForm(formData) {
  return apiRequest("/admin/download-form.php", {
    method: "POST",
    body: formData,
  });
}

export function deleteDownloadForm(id) {
  return apiRequest("/admin/download-form.php", {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
  });
}

// ============================================
// GALLERY (CRUD)
// ============================================
export function fetchGallery() {
  return apiRequest("/admin/gallery.php");
}

export function uploadGalleryImage(formData) {
  return apiRequest("/admin/gallery.php", {
    method: "POST",
    body: formData,
  });
}

export function deleteGalleryImage(id) {
  return apiRequest(`/admin/gallery.php?id=${id}`, {
    method: "DELETE",
  });
}

// ============================================
// POPUP IMAGE
// ============================================
export function fetchPopupImage() {
  return apiRequest("/admin/popup_image.php");
}

export function uploadPopupImage(formData) {
  return apiRequest("/admin/popup_image.php", {
    method: "POST",
    body: formData, // FormData — no Content-Type header, browser sets it with boundary
  });
}
