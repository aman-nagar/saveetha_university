// src/api/auth/adminAuthApi.js
import { apiRequest } from "../client";

export async function loginAdmin(email, password) {
  const endpoint = "/admin_login.php";

  return await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
