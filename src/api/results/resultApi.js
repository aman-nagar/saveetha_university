// src/api/results/resultApi.js
import { apiRequest } from "../client";
const INDEX_ENDPOINT = "/admin/result/index.php";
const UPDATE_ENDPOINT = "/admin/result/update.php";
const DELETE_ENDPOINT = "/admin/result/delete.php";

export const fetchResults = async () => {
  return await apiRequest(INDEX_ENDPOINT);
};

export const fetchResultById = async (id) => {
  if (!id) throw new Error("Result ID is required");
  return await apiRequest(`${INDEX_ENDPOINT}?id=${id}`);
};

// Submit new result
export const createResult = async (resultData) => {
  return await apiRequest(INDEX_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(resultData),
  });
};

// Update an existing result
export const updateResult = async (id, resultData) => {
  if (!id) throw new Error("Result ID is required");
  return await apiRequest(UPDATE_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({ id, ...resultData }),
  });
};

// Delete a result (Soft or Hard based on backend)
export const deleteResult = async (id) => {
  if (!id) throw new Error("Result ID is required");
  return await apiRequest(DELETE_ENDPOINT, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
};
