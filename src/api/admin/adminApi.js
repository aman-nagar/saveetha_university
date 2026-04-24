// src/api/admin/feeApi.jsx
import { apiRequest } from "../client";

const ADMIN_FEES = "/admin/admin_verify_payment.php";

export function fetchAdminFees({ page = 1 } = {}) {
  return apiRequest(`${ADMIN_FEES}?page=${page}`);
}

export function updatePaymentStatus(data) {
  return apiRequest(ADMIN_FEES, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
