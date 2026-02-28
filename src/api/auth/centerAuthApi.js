// src/api/auth/centerAuthApi.js
import { apiRequest } from "../client";

export async function loginCenter(email, password) {
  const endpoint = "/centers/login.php"; // Adjust if your backend path is different

  return await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutCenter() {
  return await apiRequest("/centers/logout.php", { method: "POST" });
}