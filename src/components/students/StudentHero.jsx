import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaGraduationCap, FaCheckCircle } from "react-icons/fa";

export default function StudentHero({ user }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-br from-[#0b1f4b] to-[#1e3a8a] text-white shadow-2xl rounded-[2.5rem] p-8 md:p-10"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="hero-grid"
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
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Avatar Section */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-300 to-white/20">
            {user?.photo && !imageError ? (
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

          {/* Active Status Badge */}
          <div className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full border-4 border-[#0b1f4b] shadow-[0_0_15px_rgba(34,197,94,0.6)]">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {/* Identity Details Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-blue-100">
            <FaGraduationCap /> Official Student Profile
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white mb-2 capitalize">
              {user?.name || "Student Name"}
            </h1>
            <p className="text-blue-200 font-mono text-sm md:text-lg tracking-widest uppercase opacity-90">
              Enrollment:{" "}
              <span className="text-white">{user?.enrollment_no || "N/A"}</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <div className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-bold backdrop-blur-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {user?.category?.toUpperCase() || "GENERAL"}
            </div>
            <div className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-bold backdrop-blur-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {user?.gender || "NOT SPECIFIED"}
            </div>
          </div>
        </div>

        {/* Verification Widget (Desktop only) */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 self-center">
          <FaCheckCircle className="text-green-400 mb-2" size={32} />
          <span className="text-[10px] font-black uppercase tracking-tighter text-white/60">
            Verification Status
          </span>
          <span className="text-sm font-bold">Active & Verified</span>
        </div>
      </div>
    </motion.div>
  );
}
