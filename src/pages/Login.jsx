// src/pages/Login.jsx

// src/pages/Login.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useToast } from "../hooks/useToast";

import FormInput from "../components/form/FormInput";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth(); // Grabbing login function from context
  const navigate = useNavigate();
  const { toast, show, clear } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("[Login.jsx] Attempting Student Login...", data.email);
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      show("success", "Login Successful! Redirecting...");

      // Navigate to the student dashboard after a short delay
      setTimeout(() => navigate("/student-dashboard"), 1500);
    } catch (err) {
      console.error("[Login.jsx] Login failed:", err);
      show("error", err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg px-4">
      {toast && <Toast {...toast} onClose={clear} />}

      <div className="bg-surface border border-border rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text">Welcome Back</h1>
          <p className="text-muted text-sm mt-2">
            Sign in to your student account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            required="Email is required"
            error={errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            required="Password is required"
            error={errors.password}
          />

          <Button type="submit" className="w-full" loading={isSubmitting}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}