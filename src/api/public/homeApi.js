/**
 * src/api/public/homeApi.js
 * API calls for home page content
 * Fetches: hero, programs, stats, testimonials, announcements
 */

import { apiRequest } from "../client";
import { HomeSchema } from "../../data/schemas";

/**
 * Fetch home page content
 * @returns {Promise<Object>} Home page data
 */
export async function fetchHome() {
  try {
    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/public/home");
    // return HomeSchema.parse(response);

    // For now, return from mock data
    const { publicMock } = await import("../../data/header.mock");
    return HomeSchema.parse(publicMock.home);
  } catch (err) {
    console.error("❌ Error fetching home content:", err);
    throw new Error("Failed to fetch home page content");
  }
}

/**
 * Fetch home section by key
 * Useful for partial updates
 * @param {string} section - Section name: hero, programs, stats, etc.
 * @returns {Promise<Object>} Section data
 */
export async function fetchHomeSection(section) {
  try {
    const homeData = await fetchHome();
    if (!homeData[section]) {
      throw new Error(`Section "${section}" not found`);
    }
    return homeData[section];
  } catch (err) {
    console.error(`❌ Error fetching home section "${section}":`, err);
    throw err;
  }
}

/**
 * Update home page content (admin only)
 * @param {Object} homeData - Updated home page configuration
 * @returns {Promise<Object>} Updated home page
 */
export async function updateHome(homeData) {
  try {
    // Validate data before sending
    const validatedData = HomeSchema.parse(homeData);

    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/admin/home", {
    //   method: "PUT",
    //   body: JSON.stringify(validatedData),
    // });
    // return response;

    throw new Error(
      "Home page update not yet implemented - waiting for admin API",
    );
  } catch (err) {
    console.error("❌ Error updating home content:", err);
    throw err;
  }
}

/**
 * Update specific home section (admin only)
 * @param {string} section - Section name: hero, programs, stats, etc.
 * @param {Object} sectionData - Updated section data
 * @returns {Promise<Object>} Updated section
 */
export async function updateHomeSection(section, sectionData) {
  try {
    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest(`/admin/home/${section}`, {
    //   method: "PUT",
    //   body: JSON.stringify(sectionData),
    // });
    // return response;

    throw new Error(
      `Home section "${section}" update not yet implemented - waiting for admin API`,
    );
  } catch (err) {
    console.error(`❌ Error updating home section "${section}":`, err);
    throw err;
  }
}
