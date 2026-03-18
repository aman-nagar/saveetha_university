/**
 * src/api/public/publicAdmissionApi.js
 * PUBLIC ADMISSION API SERVICE
 *
 * Provides public APIs for student admission form
 * - No authentication required
 * - Response structures match admin APIs exactly
 * - Uses public endpoints from backend
 */

const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";
const PUBLIC_COURSES_ENDPOINT = "/public/courses.php";
const PUBLIC_ADMISSION_ENDPOINT = "/public/student_form.php";

/**
 * Public API Request Handler (No Auth Required)
 * Returns clean data or throws error
 */
async function publicApiRequest(endpoint, options = {}) {
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Parse JSON safely
  const contentType = response.headers.get("content-type");
  let json = null;
  if (contentType && contentType.includes("application/json")) {
    try {
      json = await response.json();
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
    }
  }

  // Handle HTTP Errors
  if (!response.ok) {
    const errorMessage =
      json?.message ||
      (Array.isArray(json?.errors) ? json.errors[0] : null) ||
      `Error ${response.status}: ${response.statusText}`;

    throw new Error(errorMessage);
  }

  // Handle Logical Errors (Status 200 but success: false)
  if (json && json.success === false) {
    const logicalError =
      json.message ||
      (Array.isArray(json.errors) ? json.errors[0] : "Request failed");
    throw new Error(logicalError);
  }

  // Return Clean Data
  return json?.data ?? json;
}

/**
 * Fetch Course Categories (Types)
 * GET /public/courses.php?type=course_type
 * Returns: [{id, name}, ...]  (matches admin response structure)
 */
export async function fetchPublicCourseTypes() {
  try {
    const data = await publicApiRequest(
      `${PUBLIC_COURSES_ENDPOINT}?type=course_type`,
      { method: "GET" },
    );

    // Normalize to match admin format: {id, name}
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

/**
 * Fetch Faculties by Course Type ID
 * GET /public/courses.php?type=faculty&course_type_id={id}
 * Returns: [{id, name}, ...]  (matches admin response structure)
 */
export async function fetchPublicFaculties(courseTypeId) {
  if (!courseTypeId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${PUBLIC_COURSES_ENDPOINT}?type=faculty&course_type_id=${courseTypeId}`,
      { method: "GET" },
    );

    // Normalize to match admin format: {id, name}
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

/**
 * Fetch Courses by Faculty ID
 * GET /public/courses.php?type=course&faculty_id={id}
 * Returns: [{id, name}, ...]  (matches admin response structure)
 */
export async function fetchPublicCourses(facultyId) {
  if (!facultyId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${PUBLIC_COURSES_ENDPOINT}?type=course&faculty_id=${facultyId}`,
      { method: "GET" },
    );

    // Normalize to match admin format: {id, name}
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

/**
 * Fetch Streams by Course ID
 * GET /public/courses.php?type=stream&course_id={id}
 * Returns: [{id, name}, ...]  (matches admin response structure)
 */
export async function fetchPublicStreams(courseId) {
  if (!courseId) {
    return [];
  }

  try {
    const data = await publicApiRequest(
      `${PUBLIC_COURSES_ENDPOINT}?type=stream&course_id=${courseId}`,
      { method: "GET" },
    );

    // Normalize to match admin format: {id, name}
    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        name: item.name || item.stream_name,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching public streams:", err);
    throw new Error("Failed to load streams");
  }
}

/**
 * Submit Public Student Admission Form
 * POST /public/student_form.php
 * Accepts: FormData with student details
 * Returns: {success: true, reference_id, message}
 */
export async function submitPublicAdmission(formData) {
  try {
    const response = await publicApiRequest(PUBLIC_ADMISSION_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {},
    });

    return {
      success: true,
      reference_id: response.reference_id || "ADM-" + Date.now(),
      message: response.message || "Application submitted successfully",
      data: response,
    };
  } catch (err) {
    console.error("Error submitting public admission:", err);
    throw new Error(err.message || "Failed to submit application");
  }
}
