// src/utils/handleResponse.js
export async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Request failed");
  }

  return json.data;
}
