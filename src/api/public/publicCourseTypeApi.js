// src/api/public/publicCourseTypeApi.js
import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

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
