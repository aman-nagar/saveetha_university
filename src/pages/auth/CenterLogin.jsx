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
      const centerData = await loginCenter(data.email, data.password);
      await login({
        ...centerData,
        role: "center",
      });

      show("success", "Center Partner login successful!");

      navigate("/center", { replace: true });
    } catch (err) {
      console.log(`clg err ${err.message}`);
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
