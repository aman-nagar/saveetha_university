import Cookies from "js-cookie";
import { BASE_URL } from "../apiConfig";
import { apiRequest } from "../client";

const POST_ENDPOINT = "/admin/certificates/index.php";
const GET_ENDPOINT = "/admin/certificates/index.php";
const DELETE_ENDPOINT = "/admin/certificates/index.php";

export const FetchCertificate = async (page = 1, search = "") => {
  let url = `${GET_ENDPOINT}?page=${page}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;

  const token = Cookies.get("authToken");
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  if (!response.ok || json.success === false) {
    throw new Error(json.message || "Failed to fetch certificates");
  }

  return {
    data: json.data || [],
    pagination: json.errors || { current_page: 1, total_pages: 1 },
  };
};

export const fetchSingleCertificate = async (id) => {
  return apiRequest(`${GET_ENDPOINT}?id=${id}`);
};

export const createCertificate = async (data) => {
  return await apiRequest(`${POST_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const DeleteCertificate = async (id) => {
  if (!id) throw new Error("Certificate ID is required");
  return await apiRequest(`${DELETE_ENDPOINT}?id=${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id: id, certificate_id: id }),
  });
};
