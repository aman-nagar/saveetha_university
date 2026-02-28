// src/api/auth/studentAuthApi.js
import { apiRequest } from "../client";

export async function loginStudent(email, password) {
  const endpoint = "/students/login.php";

  return await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
