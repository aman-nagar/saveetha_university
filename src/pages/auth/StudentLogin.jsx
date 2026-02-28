// src/pages/auth/StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
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

      // 1. Update the Context State
      await login({ ...studentData, role: "student" });

      show("success", "Welcome back!");

      // 2. 🔥 FIX: Remove setTimeout. Navigate immediately.
      // Use { replace: true } so they can't go 'back' to the login form.
      navigate("/student-dashboard", { replace: true });
    } catch (err) {
      show("error", err.message);
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
