/**
 * src/api/public/academicsApi.js
 * API calls for academics/examination committee content
 * Fetches: examination committee details and members
 */

import { ExaminationCommitteeSchema } from "../../data/schemas";

/**
 * Fetch academics content (examination committee)
 * @returns {Promise<Object>} Academics data
 */
export async function fetchAcademics() {
  try {
    // TODO: Replace with real API endpoint when available
    // const response = await apiRequest("/public/academics");
    // return response;

    // For now, return from mock data
    const { publicMock } = await import("../../data/header.mock");

    // Validate the examination committee data
    if (publicMock.academics?.examinationCommittee) {
      ExaminationCommitteeSchema.parse(
        publicMock.academics.examinationCommittee,
      );
    }

    return publicMock.academics;
  } catch (err) {
    console.error("❌ Error fetching academics content:", err);
    throw new Error("Failed to fetch academics content");
  }
}

/**
 * Fetch examination committee data specifically
 * @returns {Promise<Object>} Examination committee data
 */
export async function fetchExaminationCommittee() {
  try {
    const academicsData = await fetchAcademics();
    if (!academicsData?.examinationCommittee) {
      throw new Error("Examination committee data not found");
    }
    return academicsData.examinationCommittee;
  } catch (err) {
    console.error("❌ Error fetching examination committee:", err);
    throw err;
  }
}
