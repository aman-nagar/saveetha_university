/**
 * src/api/public/franchiseApi.js
 * PUBLIC API for Franchise Applications
 *
 * NOTE: This is COMPLETELY SEPARATE from admin center management
 * - No authentication required
 * - Uses /public/franchise/ endpoint (not /centers/)
 * - Dummy implementation for now, real API can be connected later
 */

import { apiRequest } from "../client";

const FRANCHISE_ENDPOINT = "/public/franchise/apply";

/**
 * Submit franchise application (PUBLIC - NO AUTH REQUIRED)
 * @param {FormData} formData - Franchise application data
 * @returns {Promise<Object>} { success, reference_id, message }
 */
export async function submitFranchiseApplication(formData) {
  try {
    // DUMMY IMPLEMENTATION - Works in development
    // TODO: Replace with real API endpoint when ready
    // Just call: apiRequest(FRANCHISE_ENDPOINT, { method: "POST", body: formData })

    console.log(
      "📧 Franchise application (dummy mode):",
      Object.fromEntries(formData),
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Franchise application submitted successfully",
      reference_id: "FR-" + Date.now(),
      data: {
        application_id: Math.floor(Math.random() * 10000),
        status: "pending",
        submitted_date: new Date().toISOString().split("T")[0],
      },
    };
  } catch (err) {
    console.error("❌ Error submitting franchise application:", err);
    throw new Error(err.message || "Failed to submit franchise application");
  }
}

/**
 * Check franchise application status
 * @param {string} referenceId - Reference ID from submission response
 * @returns {Promise<Object>} Application status
 */
export async function checkFranchiseStatus(referenceId) {
  try {
    // DUMMY: Simulate status check
    await new Promise((resolve) => setTimeout(resolve, 500));

    const statuses = ["pending", "under_review", "approved", "rejected"];
    return {
      success: true,
      reference_id: referenceId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      updated_date: new Date().toISOString().split("T")[0],
    };
  } catch (err) {
    console.error("❌ Error checking franchise status:", err);
    throw new Error("Failed to check application status");
  }
}

/**
 * Get franchise requirements (informational)
 * @returns {Promise<Object>} Requirements and documents needed
 */
export async function getFranchiseRequirements() {
  try {
    // For now, return static requirements
    return {
      success: true,
      requirements: [
        "Valid PAN and Aadhar of owner",
        "Institute registration certificate",
        "Bank statements (last 6 months)",
        "Property ownership proof",
        "NOC from local authorities",
        "Proposed course structure",
      ],
    };
  } catch (err) {
    console.error("❌ Error fetching franchise requirements:", err);
    throw new Error("Failed to fetch requirements");
  }
}
