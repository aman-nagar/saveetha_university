// src/api/auth/adminAuthApi.js
const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function loginAdmin(email, password) {
  const res = await fetch(`${BASE_URL}/admin_login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid admin credentials");
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Login failed");
  }

  // Admin user data is inside "errors" (weird but that's the API)
  return json.errors;
}
