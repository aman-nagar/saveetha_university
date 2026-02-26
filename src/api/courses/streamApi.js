// src/api/streamApi.js

import { apiRequest } from "../client";

const ENDPOINT = "/course/index.php";

export function fetchStreams(courseId) {
  if (!courseId) {
    throw new Error("Course ID is required");
  }

  return apiRequest(`${ENDPOINT}?type=stream&course_id=${courseId}`);
}

export function fetchStreamsById(streamId) {
  if (!streamId) {
    throw new Error("Stream ID is required");
  }
  return apiRequest(`${ENDPOINT}?type=stream&id=${streamId}`);
}

export function fetchAllStreams() {
  return apiRequest(`${ENDPOINT}?type=stream`);
}

export function createStream(courseId, name) {
  const trimmed = name?.trim();

  if (!courseId) throw new Error("Course ID is required");
  if (!trimmed) throw new Error("Stream name is required");

  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "stream",
      name: trimmed,
      course_id: courseId,
    }),
  });
}

export async function updateStream(id, name, courseId) {
  if (!id) throw new Error("Stream ID required");
  if (!name?.trim()) throw new Error("Stream name required");

  return apiRequest("/course/index.php", {
    method: "PUT",
    body: JSON.stringify({
      type: "stream",
      id,
      name: name.trim(),
      course_id: courseId,
    }),
  });
}

export function deleteStream(id) {
  if (!id) throw new Error("Stream ID is required");

  return apiRequest(ENDPOINT, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "stream",
      id: String(id),
    }),
  });
}
