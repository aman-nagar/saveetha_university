import { publicApiRequest } from "./publicApiRequest";

const ENDPOINT = "/public/courses.php";

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
