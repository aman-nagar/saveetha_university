// src/api/admin/feeApi.jsx
import { apiRequest } from "../client";

const ADMIN_FEES = "/admin/admin_verify_payment.php";
const ADMIN_PROFILE = "/admin/profile.php";

export function fetchAdminFees({ page = 1 } = {}) {
  return apiRequest(`${ADMIN_FEES}?page=${page}`);
}

export function updatePaymentStatus(data) {
  return apiRequest(ADMIN_FEES, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function fetchAdminProfile() {
  return apiRequest(ADMIN_PROFILE);
}

export function updateAdminProfile({ email, newPassword }) {
  return apiRequest(ADMIN_PROFILE, {
    method: "POST",
    body: JSON.stringify({
      email,
      new_password: newPassword,
    }),
  });
}