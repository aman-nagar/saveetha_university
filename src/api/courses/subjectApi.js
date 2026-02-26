// src/api/courses/subjectApi.js
import { apiRequest } from "../client";

const ENDPOINT = "/course/subject.php";

export function fetchSubjects(streamId) {
  if (!streamId) {
    throw new Error("Stream ID is required");
  }
  return apiRequest(`${ENDPOINT}?type=subject&stream_id=${streamId}`);
}

export function fetchSubjectById(id) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(`${ENDPOINT}?type=subject&id=${id}`);
}

// Create with all required fields
export function createSubject(subjectData) {
  const {
    stream_id,
    subject_name,
    subject_code,
    short_name,
    max_theory_marks,
    max_practical_marks,
    duration,
    duration_type,
    status = 1,
    is_deleted = 0,
  } = subjectData;

  if (!stream_id) throw new Error("Stream ID is required");
  if (!subject_name?.trim()) throw new Error("Subject name is required");

  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stream_id,
      subject_name: subject_name.trim(),
      subject_code: subject_code || "",
      short_name: short_name || "",
      max_theory_marks: Number(max_theory_marks) || 0,
      max_practical_marks: Number(max_practical_marks) || 0,
      duration: Number(duration) || 0,
      duration_type: duration_type || "year",
      status,
      is_deleted,
    }),
  });
}

// Update with all fields
export function updateSubject(id, subjectData) {
  if (!id) throw new Error("Subject ID is required");
  if (!subjectData?.subject_name?.trim())
    throw new Error("Subject name is required");

  return apiRequest(ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      stream_id: subjectData.stream_id,
      subject_name: subjectData.subject_name.trim(),
      subject_code: subjectData.subject_code || "",
      short_name: subjectData.short_name || "",
      max_theory_marks: Number(subjectData.max_theory_marks) || 0,
      max_practical_marks: Number(subjectData.max_practical_marks) || 0,
      duration: Number(subjectData.duration) || 0,
      duration_type: subjectData.duration_type || "year",
      status: subjectData.status ?? 1,
    }),
  });
}

// Toggle status only
export function updateSubjectStatus(id, status) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
}

export function deleteSubject(id) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}
