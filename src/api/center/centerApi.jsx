// src/api/center/centerApi.jsx
import { apiRequest } from "../client";

const CENTER_ENDPOINT = "/centers/index.php";
const UPDATE_ENDPOINT = "/centers/update.php";

export function fetchCenters() {
  return apiRequest(`${CENTER_ENDPOINT}`);
}

export function fetchCenterById(id) {
  return apiRequest(`${CENTER_ENDPOINT}?id=${id}`);
}

export function createCenter(formData) {
  return apiRequest(`${CENTER_ENDPOINT}`, {
    method: "POST",
    body: formData,
  });
}

export function updateCenter(formData) {
  return apiRequest(`${UPDATE_ENDPOINT}`, {
    method: "POST",
    body: formData,
  });
}
