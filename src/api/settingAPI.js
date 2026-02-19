// src/api/api.js
const BASE_URL = "https://api.nsprowebtech.com/backend/api/v1";

// settings
// sitesettings
export async function fetchSiteSettings() {
  const res = await fetch(`${BASE_URL}/settings/`);
  const json = await res.json();
  return json.data;
}

export async function updateSiteSettings(formData) {
  const res = await fetch(`${BASE_URL}/settings/`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}
