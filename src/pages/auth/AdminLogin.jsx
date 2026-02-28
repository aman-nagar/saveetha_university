// src/pages/auth/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import { loginAdmin } from "../../api/auth/adminAuthApi";
import LoginForm from "./LoginForm";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show } = useToast();

  const handleAdminSubmit = async (data) => {
    setLoading(true);
    try {
      const adminData = await loginAdmin(data.email, data.password);

      // 1. Log in the user
      await login({ ...adminData, role: "admin" });

      show("success", "Welcome, Administrator");

      // 2. 🔥 FIX: Remove setTimeout. Navigate immediately and use { replace: true }
      // This prevents the user from going 'back' to the login page after success.
      navigate("/admin", { replace: true });
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      title="Admin Login"
      subtitle="Secure access for management"
      icon={<FaUserTie size={32} />}
      onSubmit={handleAdminSubmit}
      isSubmitting={loading}
    />
  );
}
