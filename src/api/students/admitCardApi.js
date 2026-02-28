// src/api/admin/admitCardApi.js
import { apiRequest } from "../client";

// We remove the local BASE_URL because client.js handles the root path
export async function fetchAdmitCards(page = 1) {
  // Pass the relative path starting from /admin
  const endpoint = `/admin/admit-card/index.php?page=${page}`;
  
  const data = await apiRequest(endpoint);
  
  // Since client.js returns 'json.data', and your POSTMAN shows 
  // 'data' contains 'records', we return that array directly.
  return data?.records || [];
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