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
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const json = await res.json();

  if (json.success === false) {
    throw new Error(
      json.message || "Login failed. Please check your credentials.",
    );
  }

  // NOTE: The backend returns the user data inside the "data" object.
  return json.data;
}
