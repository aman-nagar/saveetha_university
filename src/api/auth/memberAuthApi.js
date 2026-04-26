import { apiRequest } from "../client";

export async function loginMember(email, password) {
  return apiRequest("/member-dashboard/member_login.php", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutMember() {
  return null;
}
