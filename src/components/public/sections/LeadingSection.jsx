import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import {
  FaTrophy,
  FaUserShield,
  FaHandshake,
  FaIndustry,
  FaClock,
  FaHeartbeat,
} from "react-icons/fa";

const ICON_MAP = {
  rank: <FaTrophy />,
  secure: <FaUserShield />,
  research: <FaHandshake />,
  industry: <FaIndustry />,
  clock: <FaClock />,
  medical: <FaHeartbeat />,
};

export default function LeadingSection() {
  const { home } = usePublicContent();
  const data = home?.leadingSection;

  if (!data) return null;

  return (
    <section className="w-full min-h-[60vh] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: Branding with Animated Pattern */}
      <div className="flex-1 relative min-h-[400px] flex items-center justify-center pattern-leading">
        <div className="absolute inset-0 bg-primary/85 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-white leading-tight tracking-tighter"
          >
            {data.title} <br />
            <span className="text-accent italic">{data.highlight}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            className="h-1.5 bg-accent mx-auto mt-6 rounded-full"
          />
        </div>
      </div>

      {/* RIGHT: Animated Features Grid */}
      <div className="flex-1 bg-primary p-10 md:p-20 flex items-center relative">
        {/* Subtle Background Watermark */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full relative z-10">
          {data.features.map((item, i) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container with Continuous Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2, // Staggered floating effect
                }}
                className="relative mb-6"
              >
                {/* Outer Pulse Ring (Visible on hover) */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent/50 z-0"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{
                    scale: 1.5,
                    opacity: 0,
                    transition: { duration: 0.8, repeat: Infinity },
                  }}
                />

                {/* Main Icon Circle */}
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl md:text-3xl text-white transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-primary group-hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
                  {ICON_MAP[item.icon]}
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="space-y-1">
                <h4 className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-tight group-hover:text-white transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-widest">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
