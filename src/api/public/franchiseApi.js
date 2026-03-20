// src/api/public/franchiseApi.js
import { publicApiRequest } from "./publicApiRequest";
const FRANCHISE_ENDPOINT = "/public/create-centers.php";

export async function submitFranchiseApplication(formData) {
  return publicApiRequest(`${FRANCHISE_ENDPOINT}`, {
    method: "POST",
    body: formData,
  });
}
