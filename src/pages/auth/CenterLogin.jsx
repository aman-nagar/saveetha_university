import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import { loginCenter } from "../../api/auth/centerAuthApi";
import LoginForm from "./LoginForm";

export default function CenterLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show } = useToast();

  const handleCenterSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Call the specific Center API
      const centerData = await loginCenter(data.email, data.password);

      // 2. Normalize the user object and set role to 'center'
      // This ensures ProtectedRoute allows access to /center
      await login({
        ...centerData,
        role: "center",
      });

      show("success", "Center Partner login successful!");

      // 3. Redirect to the Center Dashboard
      setTimeout(() => navigate("/center"), 1000);
    } catch (err) {
      show("error", err.message || "Invalid center credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      title="Center Login"
      subtitle="Management portal for university partners"
      icon={<FaUniversity size={32} />}
      onSubmit={handleCenterSubmit}
      isSubmitting={loading}
      emailLabel="Center Email"
    />
  );
}
