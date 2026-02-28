import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

export default function LoginForm({ title, subtitle, icon, onSubmit, isSubmitting, emailLabel = "Email Address" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Mouse tracking effect from your original code
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;
    const handleMouseMove = (e) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg flex items-center justify-center overflow-hidden relative font-sans p-4 sm:p-8">
      {/* Background Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          animate={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="relative bg-surface/80 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="p-8 sm:p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg shadow-primary/25 text-white">
                {icon}
              </div>
              <h1 className="text-3xl font-bold text-text mb-2 tracking-tight">{title}</h1>
              <p className="text-muted text-sm">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider ml-1">{emailLabel}</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
                  <input
                    {...register("email", { required: "Required" })}
                    type="email"
                    className="w-full bg-bg border border-border rounded-xl py-3.5 pl-12 pr-4 text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
                  <input
                    {...register("password", { required: "Required" })}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-bg border border-border rounded-xl py-3.5 pl-12 pr-12 text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary p-1">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-primary/40 transition-all disabled:opacity-70 mt-4 overflow-hidden"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Sign In <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
                </span>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}