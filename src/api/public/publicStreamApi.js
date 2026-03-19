// src/api/public/publicStreamApi.js
import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

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
