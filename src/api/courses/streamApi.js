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

export function createStream(courseId, name, applicationFee) {
  const trimmed = name?.trim();

  if (!courseId) throw new Error("Course ID is required");
  if (!trimmed) throw new Error("Stream name is required");
  if (!applicationFee && applicationFee !== 0)
    throw new Error("Application fee is required");

  return apiRequest(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "stream",
      course_id: parseInt(courseId),
      name: trimmed,
      application_fee: parseFloat(applicationFee),
      status: 1,
    }),
  });
}

export async function updateStream(id, name, courseId, applicationFee) {
  if (!id) throw new Error("Stream ID required");
  if (!name?.trim()) throw new Error("Stream name required");
  if (!applicationFee && applicationFee !== 0)
    throw new Error("Application fee is required");

  return apiRequest("/course/index.php", {
    method: "PUT",
    body: JSON.stringify({
      type: "stream",
      id,
      course_id: parseInt(courseId),
      name: name.trim(),
      application_fee: parseFloat(applicationFee),
      status: 1,
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
