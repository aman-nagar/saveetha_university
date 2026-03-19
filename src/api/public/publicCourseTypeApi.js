/**
 * src/api/public/publicCourseTypeApi.js
 * PUBLIC COURSE TYPE API
 *
 * Fetch course types for public student admission form
 * Uses public endpoint (no auth required)
 */

import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

/**
 * Fetch all course types for public form
 * GET /public/courses.php?type=course_type
 * Returns: [{id, name}, ...]
 */
export async function fetchPublicCourseTypes() {
  try {
    const data = await publicApiRequest(`${ENDPOINT}?type=course_type`, {
      method: "GET",
    });

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        name: item.name || item.course_type_name || item.type_name,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching public course types:", err);
    throw new Error("Failed to load course categories");
  }
}
