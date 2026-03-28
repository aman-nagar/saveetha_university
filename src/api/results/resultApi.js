// src/api/results/resultApi.js
import { apiRequest } from "../client";
import { BASE_URL } from "../apiConfig";
import Cookies from "js-cookie";

const INDEX_ENDPOINT = "/admin/result/index.php";
const UPDATE_ENDPOINT = "/admin/result/update.php";
const DELETE_ENDPOINT = "/admin/result/delete.php";

export const fetchResults = async (page = 1, search = "") => {
  // Make raw request to preserve pagination metadata in 'errors' object
  const token = Cookies.get("authToken");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const query = new URLSearchParams({ page: String(page) });
  if (search?.trim()) query.append("search", search.trim());

  const response = await fetch(`${BASE_URL}${INDEX_ENDPOINT}?${query.toString()}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch results: ${response.statusText}`);
  }

  const json = await response.json();

  // Return full response to preserve pagination metadata in 'errors' object
  return {
    data: json.data || [],
    pagination: json.errors || {}, // pagination info is in 'errors' object from API
    success: json.success,
    message: json.message,
  };
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
