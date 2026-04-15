// src/api/certificate/certificate.js
import { apiRequest } from "../client";

const CERTIFICATE_FORMAT_IMG = "view-format/certificate.php";
const POST_ENDPOINT = "/admin/certificates/index.php";
const GET_ENDPOINT = "/admin/certificates/index.php";
const DELETE_ENDPOINT = "/admin/certificates/index.php";

export const FetchCertificateFormatImg = async () => {
  return await apiRequest(`${CERTIFICATE_FORMAT_IMG}`);
};
export const FetchCertificate = async () => {
  return await apiRequest(`${GET_ENDPOINT}`);
};

export const createCertificate = async (data) => {
  return await apiRequest(`${POST_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const DeleteCertificate = async (id) => {
  if (!id) throw new Error("Certificate ID is required");

  // We append ?id= to the URL AND send certificate_id in the body
  // to ensure the PHP backend catches it no matter how it reads DELETE requests.
  return await apiRequest(`${DELETE_ENDPOINT}?id=${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
      certificate_id: id,
    }),
  });
};
