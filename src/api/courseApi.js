const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

// Fetch course categories
export async function fetchCourseCategory() {
  try {
    const res = await fetch(`${BASE_URL}/course/index.php?type=course_type`);

    if (!res.ok) {
      throw new Error("Failed to fetch course categories");
    }

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("fetchCourseCategory error:", err);
    return [];
  }
}

// Add new course category
export async function addCourseCategory(formData) {
  try {
    const res = await fetch(`${BASE_URL}/course/`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add category");
    }

    return json;
  } catch (err) {
    console.error("addCourseCategory error:", err);
    throw err;
  }
}
