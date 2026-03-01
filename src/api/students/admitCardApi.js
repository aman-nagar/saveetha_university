// src/api/admin/admitCardApi.js
import { apiRequest } from "../client";

// We remove the local BASE_URL because client.js handles the root path
export async function fetchAdmitCards(page = 1) {
  const endpoint = `/admin/admit-card/index.php?page=${page}`;
  return await apiRequest(endpoint);
}

export async function fetchAdmitCardById(id) {
  const endpoint = `/admin/admit-card/index.php?id=${id}`;

  // Returns the single card object inside json.data
  return await apiRequest(endpoint);
}

export async function createAdmitCard(payload) {
  const endpoint = `/admin/admit-card/create.php`;

  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const updateAdmitCard = async (payload) => {
  return await apiRequest("/admin/admit-card/update.php", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const hardDeleteAdmitCard = async (id) => {
  return await apiRequest(`/admin/admit-card/delete-hard.php?id=${id}`, {
    method: "DELETE",
  });
};
