//  src/api/public/publicFacultyApi.js
import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

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
