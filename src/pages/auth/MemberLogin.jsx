import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { loginMember } from "../../api/auth/memberAuthApi";
import LoginForm from "./LoginForm";

export default function MemberLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show } = useToast();

  const handleMemberSubmit = async (data) => {
    setLoading(true);
    try {
      const memberData = await loginMember(data.email, data.password);
      const normalizedMemberData = {
        ...memberData,
        ...(memberData?.member || memberData?.user || {}),
        role: "member",
      };

      await login(normalizedMemberData);

      show("success", `Welcome back, ${normalizedMemberData.name || "Member"}`);
      navigate("/member-dashboard", { replace: true });
    } catch (err) {
      show("error", err.message || "Invalid member credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      title="Member Login"
      subtitle="Access your member dashboard"
      icon={<FaUsers size={32} />}
      onSubmit={handleMemberSubmit}
      isSubmitting={loading}
    />
  );
}
