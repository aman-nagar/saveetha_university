/**
 * src/api/public/footerApi.js
 * API calls for footer content
 * Fetches: copyright, links, contact info, social media
 */

import { apiRequest } from "../client";
import { FooterSchema } from "../../data/schemas";

/**
 * Fetch footer configuration
 * @returns {Promise<Object>} Footer data
 */
export async function fetchFooter() {
  try {
    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/public/footer");
    // return FooterSchema.parse(response);

    // For now, return from mock data
    const { publicMock } = await import("../../data/header.mock");
    return FooterSchema.parse(publicMock.footer);
  } catch (err) {
    console.error("❌ Error fetching footer:", err);
    throw new Error("Failed to fetch footer configuration");
  }
}

/**
 * Update footer configuration (admin only)
 * @param {Object} footerData - Updated footer configuration
 * @returns {Promise<Object>} Updated footer
 */
export async function updateFooter(footerData) {
  try {
    // Validate data before sending
    const validatedData = FooterSchema.parse(footerData);

    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/admin/footer", {
    //   method: "PUT",
    //   body: JSON.stringify(validatedData),
    // });
    // return response;

    throw new Error(
      "Footer update not yet implemented - waiting for admin API",
    );
  } catch (err) {
    console.error("❌ Error updating footer:", err);
    throw err;
  }
}
