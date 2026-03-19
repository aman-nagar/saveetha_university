/**
 * src/api/public/publicCourseApi.js
 * PUBLIC COURSE API
 *
 * Fetch courses by faculty for public student admission form
 * Uses public endpoint (no auth required)
 */

import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

/**
 * Fetch courses by faculty ID
 * GET /public/courses.php?type=course&faculty_id={id}
 * Returns: [{id, name}, ...]
 */
export async function fetchPublicCourses(facultyId) {
  if (!facultyId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${ENDPOINT}?type=course&faculty_id=${facultyId}`,
      { method: "GET" },
    );

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        name: item.name || item.course_name,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching public courses:", err);
    throw new Error("Failed to load courses");
  }
}
