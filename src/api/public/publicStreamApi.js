/**
 * src/api/public/publicStreamApi.js
 * PUBLIC STREAM API
 *
 * Fetch streams by course for public student admission form
 * Uses public endpoint (no auth required)
 */

import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

/**
 * Fetch streams by course ID
 * GET /public/courses.php?type=stream&course_id={id}
 * Returns: [{id, name, application_fee}, ...]
 */
export async function fetchPublicStreams(courseId) {
  if (!courseId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${ENDPOINT}?type=stream&course_id=${courseId}`,
      { method: "GET" },
    );

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        name: item.name || item.stream_name,
        application_fee: item.application_fee,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching public streams:", err);
    throw new Error("Failed to load streams");
  }
}
