// src/pages/auth/StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import LoginForm from "./LoginForm";
import { loginStudent } from "../../api/auth/studentAuthApi";

export default function StudentLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { show } = useToast();

  const handleStudentSubmit = async (data) => {
    setLoading(true);
    try {
      const studentData = await loginStudent(data.email, data.password);
      await login({ ...studentData, role: "student" });
      show("success", "Login successful! Welcome back.");
      navigate("/student-dashboard", { replace: true });
    } catch (err) {
      show("error", err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      title="Student Login"
      subtitle="Access your academic portal"
      icon={<FaUserGraduate size={32} />}
      onSubmit={handleStudentSubmit}
      isSubmitting={loading}
    />
  );
}
