import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaClipboardList,
  FaCheckCircle,
  FaGraduationCap,
  FaIdCard,
  FaEnvelope,
  FaCalendarAlt,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";

// --- Sub-Components for the Bento Grid ---

const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const DetailItem = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 border border-slate-100"
  >
    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-slate-800 font-medium text-sm md:text-base">
        {value || "N/A"}
      </p>
    </div>
  </motion.div>
);

const SkeletonCard = ({ className = "" }) => (
  <div
    className={`bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 ${className}`}
  >
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-200 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching for the skeleton screen effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] p-4 sm:p-8 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <SkeletonCard className="md:col-span-12 h-64" />
          <SkeletonCard className="md:col-span-4 h-96" />
          <SkeletonCard className="md:col-span-8 h-96" />
          <SkeletonCard className="md:col-span-6 h-64" />
          <SkeletonCard className="md:col-span-6 h-64" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="text-slate-500 font-medium">
          Session Expired. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. IDENTITY HERO (Passport Card) - Spans full width on mobile, 8 cols on desktop */}
          <Card
            className="md:col-span-8 relative overflow-hidden bg-gradient-to-br from-[#0b1f4b] to-[#1e3a8a] text-white shadow-2xl"
            delay={0.1}
          >
            {/* Geometric Watermark Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle
                  cx="80%"
                  cy="20%"
                  r="100"
                  fill="white"
                  fillOpacity="0.05"
                />
                <circle
                  cx="20%"
                  cy="80%"
                  r="150"
                  fill="white"
                  fillOpacity="0.05"
                />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-300 to-white">
                  {user.photo && !imageError ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover border-4 border-[#0b1f4b]"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-[#0b1f4b]">
                      <FaUser className="text-4xl text-slate-400" />
                    </div>
                  )}
                </div>
                {/* Glowing Status Indicator */}
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full border-4 border-[#0b1f4b] shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-blue-100 mb-2">
                  <FaGraduationCap /> Active Student
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mb-1">
                  {user.name}
                </h1>
                <p className="text-blue-200 font-mono text-sm md:text-base tracking-wide uppercase">
                  Enrollment No: {user.enrollment_no}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                  <span className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm font-medium backdrop-blur-sm">
                    {user.category?.toUpperCase()}
                  </span>
                  <span className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm font-medium backdrop-blur-sm">
                    {user.gender}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 2. QUICK STATS / MINI WIDGETS - Spans 4 cols */}
          <div className="md:col-span-4 grid grid-cols-1 gap-6">
            <Card
              className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 flex items-center justify-between p-6"
              delay={0.2}
            >
              <div>
                <p className="text-amber-800 font-serif text-lg font-bold">
                  Academic Year
                </p>
                <p className="text-amber-600/80 text-sm">2023 - 2024</p>
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-500">
                <FaCalendarAlt size={20} />
              </div>
            </Card>

            <Card
              className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 flex items-center justify-between p-6"
              delay={0.3}
            >
              <div>
                <p className="text-emerald-800 font-serif text-lg font-bold">
                  Status
                </p>
                <p className="text-emerald-600/80 text-sm">Verified & Active</p>
              </div>
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-500">
                <FaCheckCircle size={20} />
              </div>
            </Card>
          </div>

          {/* 3. PERSONAL INFO GRID - Spans 6 cols */}
          <Card className="md:col-span-6 p-6 md:p-8" delay={0.4}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FaIdCard size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-serif">
                Personal Details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem
                icon={FaUser}
                label="Father's Name"
                value={user.father_name}
                delay={0.5}
              />
              <DetailItem
                icon={FaUser}
                label="Mother's Name"
                value={user.mother_name}
                delay={0.6}
              />
              <DetailItem
                icon={FaCalendarAlt}
                label="Date of Birth"
                value={user.dob}
                delay={0.7}
              />
              <DetailItem
                icon={FaUser}
                label="Gender"
                value={user.gender}
                delay={0.8}
              />
            </div>
          </Card>

          {/* 4. CONTACT INFO - Spans 6 cols */}
          <Card className="md:col-span-6 p-6 md:p-8" delay={0.5}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <FaEnvelope size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-serif">
                Contact & Location
              </h2>
            </div>
            <div className="space-y-4">
              <DetailItem
                icon={FaPhone}
                label="Phone Number"
                value={user.contact_number}
                delay={0.6}
              />
              <DetailItem
                icon={FaEnvelope}
                label="Email Address"
                value={user.email}
                delay={0.7}
              />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <FaMapMarkerAlt className="mt-1 text-slate-400" />
                  <span>
                    {user.address}, {user.city}, {user.state}, {user.country} -{" "}
                    {user.pincode}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* --- FLOATING COMMAND CENTER (Dock) --- */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-2 flex items-center justify-between md:justify-around gap-2"
        >
          <ActionButton
            icon={<FaClipboardList size={18} />}
            label="Grades"
            color="bg-blue-600"
            onClick={() => {}}
          />
          <div className="w-px h-8 bg-slate-200 mx-1" />
          <ActionButton
            icon={<FaUserEdit size={18} />}
            label="Edit Profile"
            color="bg-slate-800"
            onClick={() => {}}
          />
          <div className="w-px h-8 bg-slate-200 mx-1" />
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
          >
            {loggingOut ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <FaSignOutAlt
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
            <span className="hidden sm:inline">
              {loggingOut ? "Exiting..." : "Logout"}
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// --- Helper Components ---

const ActionButton = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 text-slate-600 hover:text-slate-900`}
  >
    <div
      className={`${color} text-white p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <span className="font-medium text-sm hidden sm:inline-block">{label}</span>
  </button>
);
