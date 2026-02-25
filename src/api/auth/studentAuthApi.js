// src/api/auth/studentAuthApi.js
const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

export async function loginStudent(email, password) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/students/login.php`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Invalid student credentials");
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Login failed");
  }

  return json.data;
}
