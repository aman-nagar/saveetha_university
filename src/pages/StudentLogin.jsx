// src/pages/StudentLogin.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";

import { useToast } from "../hooks/useToast";
import { useAuth } from "../context/AuthContext";
import { loginStudent } from "../api/auth/studentAuthApi";

export default function StudentLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const { toast, show, clear } = useToast();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const studentData = await loginStudent(data.email, data.password);

      // Normalize user object for AuthContext
      const user = {
        id: studentData.student_id,
        name: studentData.candidate_name,
        email: studentData.email,
        role: "student",
        token: studentData.token,
        ...studentData,
      };

      await login(user);
      show("success", "Login successful!");

      setTimeout(() => navigate("/student-dashboard"), 1500);
    } catch (err) {
      show("error", err.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg flex items-center justify-center overflow-hidden relative font-sans p-4 sm:p-6 lg:p-8">
      {/* Background (same as before) – keep your existing background JSX */}
      {/* ... */}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-md"
      >
        <div className="relative bg-surface/95 sm:bg-surface/80 backdrop-blur-xl border border-border rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_-12px_rgba(11,31,75,0.2)] sm:shadow-[0_25px_50px_-12px_rgba(11,31,75,0.25)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="p-6 sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4 sm:mb-6 shadow-lg shadow-primary/25">
                <FaUserGraduate
                  size={24}
                  className="sm:text-[28px] lg:text-[32px] text-white"
                />
              </div>
              <h1 className="text-2xl sm:text-[28px] lg:text-3xl font-bold text-text mb-1.5 sm:mb-2 tracking-tight font-heading">
                Student Login
              </h1>
              <p className="text-muted text-xs sm:text-sm px-2 sm:px-0">
                Sign in to access your student portal
              </p>
            </motion.div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <label className="block text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider mb-1.5 sm:mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                    <FaEnvelope size={14} className="sm:text-base" />
                  </div>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="you@university.edu"
                    className="w-full bg-bg border border-border rounded-lg sm:rounded-xl py-3 sm:py-3.5 pl-10 sm:pl-12 pr-4 text-sm sm:text-base text-text placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-danger text-[10px] sm:text-xs mt-1.5 sm:mt-2 ml-1 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-danger shrink-0" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <label className="block text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider mb-1.5 sm:mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                    <FaLock size={14} className="sm:text-base" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-bg border border-border rounded-lg sm:rounded-xl py-3 sm:py-3.5 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base text-text placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors p-1"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={14} className="sm:text-base" />
                    ) : (
                      <FaEye size={14} className="sm:text-base" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-danger text-[10px] sm:text-xs mt-1.5 sm:mt-2 ml-1 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-danger shrink-0" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end"
              >
                <button
                  type="button"
                  className="text-[10px] sm:text-xs text-primary hover:text-secondary transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm sm:text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-2 sm:mt-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight
                        size={14}
                        className="sm:text-base group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs text-muted"
            >
              Protected by University Security Protocols
            </motion.p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="hidden sm:block absolute -top-16 -right-16 lg:-top-20 lg:-right-20 w-32 h-32 lg:w-40 lg:h-40 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="hidden sm:block absolute -bottom-16 -left-16 lg:-bottom-20 lg:-left-20 w-48 h-48 lg:w-60 lg:h-60 border border-secondary/10 rounded-full"
        />
      </motion.div>
    </div>
  );
}
