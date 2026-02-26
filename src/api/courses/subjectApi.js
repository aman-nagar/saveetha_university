// src/api/courses/subjectApi.js
import { apiRequest } from "../client";

const ENDPOINT = "/course/subject.php";

/* -------------------------
   Fetch All Subjects
-------------------------- */
export function fetchSubjects() {
  return apiRequest(ENDPOINT);
}

/* -------------------------
   Create Subject
-------------------------- */
export function createSubject(data) {
  return apiRequest(ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      stream_id: data.stream_id,
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      short_name: data.short_name,
      max_theory_marks: data.max_theory_marks,
      max_practical_marks: data.max_practical_marks,
      duration: data.duration,
      duration_type: data.duration_type,
      status: data.status,
      is_deleted: 0,
    }),
  });
}

/* -------------------------
   Update Subject
-------------------------- */
export function updateSubject(data) {
  return apiRequest(ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({
      id: data.id,
      stream_id: data.stream_id,
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      short_name: data.short_name,
      max_theory_marks: data.max_theory_marks,
      max_practical_marks: data.max_practical_marks,
      duration: data.duration,
      duration_type: data.duration_type,
      status: data.status,
    }),
  });
}
export function toggleUpdateStatus(data) {
  return apiRequest(ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({
      id: data.id,
      status: data.status,
    }),
  });
}

/* -------------------------
   Delete Subject
-------------------------- */
export function deleteSubject(id) {
  return apiRequest(ENDPOINT, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
