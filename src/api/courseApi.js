import { BASE_URL } from "./config";
import { handleResponse } from "./handleResponse";

const COURSE_URL = `${BASE_URL}/course/index.php`;

/* -------------------------
   FACULTY (for CoursePanel)
   This fetches ALL faculty
-------------------------- */
export async function fetchAllFaculty() {
  const res = await fetch(`${COURSE_URL}?type=faculty`);
  return handleResponse(res);
}

/* -------------------------
   COURSES
-------------------------- */

export async function fetchCourses(facultyId) {
  if (!facultyId) {
    throw new Error("Faculty ID is required");
  }

  const res = await fetch(`${COURSE_URL}?type=course&faculty_id=${facultyId}`);

  return handleResponse(res);
}

export async function createCourse({
  facultyId,
  name,
  duration,
  durationType,
}) {
  if (!facultyId) throw new Error("Faculty ID is required");
  if (!name?.trim()) throw new Error("Course name is required");
  if (!duration) throw new Error("Duration is required");
  if (!durationType) throw new Error("Duration type is required");

  const res = await fetch(`${BASE_URL}/course/index.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "course",
      name: name.trim(),
      duration,
      duration_type: durationType,
      faculty_id: facultyId,
    }),
  });

  return handleResponse(res);
}

export async function deleteCourse(id) {
  if (!id) {
    throw new Error("Course ID is required");
  }

  const res = await fetch(COURSE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "course",
      id: String(id),
    }),
  });

  return handleResponse(res);
}
