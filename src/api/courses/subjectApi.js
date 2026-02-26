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

export function createSubject(streamId, name) {
  const trimmed = name?.trim();
  if (!streamId) throw new Error("Stream ID is required");
  if (!trimmed) throw new Error("Subject name is required");

  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "subject",
      name: trimmed,
      stream_id: streamId,
    }),
  });
}

// FIXED: Accept object parameter to match usage pattern
export function updateSubject(id, subjectData) {
  if (!id) throw new Error("Subject ID is required");
  if (!subjectData?.subject_name) throw new Error("Subject name is required");

  return apiRequest(ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "subject",
      id,
      subject_name: subjectData.subject_name,
      stream_id: subjectData.stream_id,
    }),
  });
}

// For toggling status
export function updateSubjectStatus(id, status) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "subject", id, status }),
  });
}

export function deleteSubject(id) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "subject", id }),
  });
}