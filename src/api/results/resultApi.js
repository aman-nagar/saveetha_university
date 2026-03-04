// src/api/results/resultApi.js
import { apiRequest } from "../client";
const END_POINT = "/admin/result/index.php";

export const fetchResults = async () => {
  return await apiRequest(`${END_POINT}`);
};

// Submit new result
export const createResult = async (resultData) => {
  return await apiRequest(END_POINT, {
    method: "POST",
    body: JSON.stringify(resultData),
  });
};

// Update an existing result
export const updateResult = async (id, resultData) => {
  return await apiRequest(`${BASE_PATH}/update.php`, {
    method: "POST",
    body: JSON.stringify({ id, ...resultData }),
  });
};

// Delete a result (Soft or Hard based on backend)
export const deleteResult = async (id) => {
  return await apiRequest(`${BASE_PATH}/delete.php`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
};
