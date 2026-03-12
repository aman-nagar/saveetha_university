/**
 * src/api/public/headerApi.js
 * API calls for header content
 * Fetches: topbar, branding, navigation
 */

import { apiRequest } from "../client";
import { HeaderSchema } from "../../data/schemas";

/**
 * Fetch header configuration
 * @returns {Promise<Object>} Header data: { topbar, branding, navigation }
 */
export async function fetchHeader() {
  try {
    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/public/header");
    // return HeaderSchema.parse(response);

    // For now, return from mock data
    const { publicMock } = await import("../../data/header.mock");
    return HeaderSchema.parse(publicMock.header);
  } catch (err) {
    console.error("❌ Error fetching header:", err);
    throw new Error("Failed to fetch header configuration");
  }
}

/**
 * Update header configuration (admin only)
 * @param {Object} headerData - Updated header configuration
 * @returns {Promise<Object>} Updated header
 */
export async function updateHeader(headerData) {
  try {
    // Validate data before sending
    const validatedData = HeaderSchema.parse(headerData);

    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/admin/header", {
    //   method: "PUT",
    //   body: JSON.stringify(validatedData),
    // });
    // return response;

    throw new Error(
      "Header update not yet implemented - waiting for admin API",
    );
  } catch (err) {
    console.error("❌ Error updating header:", err);
    throw err;
  }
}
