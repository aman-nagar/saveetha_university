/**
 * src/api/public/publicFacultyApi.js
 * PUBLIC FACULTY API
 *
 * Fetch faculties by course type for public student admission form
 * Uses public endpoint (no auth required)
 */

import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

/**
 * Fetch faculties by course type ID
 * GET /public/courses.php?type=faculty&course_type_id={id}
 * Returns: [{id, name}, ...]
 */
export async function fetchPublicFaculties(courseTypeId) {
  if (!courseTypeId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${ENDPOINT}?type=faculty&course_type_id=${courseTypeId}`,
      { method: "GET" },
    );

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        name: item.name || item.faculty_name,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching public faculties:", err);
    throw new Error("Failed to load faculties");
  }
}
