// src/api/courses/subjectApi.js
import { apiRequest } from "../client";

const ENDPOINT = "/course/subject.php";

export function fetchSubjects(streamId) {
  if (!streamId) throw new Error("Stream ID is required");
  return apiRequest(`${ENDPOINT}?type=subject&stream_id=${streamId}`);
}

export function fetchSubjectById(id) {
  if (!id) throw new Error("Subject ID is required");
  return apiRequest(`${ENDPOINT}?type=subject&id=${id}`);
}

export function createSubject(data) {
  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateSubject(data) {
  return apiRequest(ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
