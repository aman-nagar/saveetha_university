import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  FaGraduationCap,
  FaIndustry,
  FaMicroscope,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { usePublicContent } from "@/hooks/usePublicContent";
import bgGallery from "../../assets/images/bg-gallery.jpg";

// Map string keys from Mock Data to actual Icon components
const ICON_MAP = {
  graduation: <FaGraduationCap />,
  industry: <FaIndustry />,
  infrastructure: <FaChalkboardTeacher />,
  microscope: <FaMicroscope />,
};

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 90,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(numericValue);
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const { home } = usePublicContent();
  const data = home?.whyUs;

  if (!data) return null;

  return (
    <section
      className="relative py-32 px-4 overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(161, 42, 42, 0.85), rgba(11, 31, 75, 0.85)), url(${bgGallery})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Top accent glow */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
        />

        {/* Bottom secondary glow */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        {/* Center accent accent */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl"
        />
      </motion.div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-accent mx-auto mb-8 rounded-full"
          />

          <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 uppercase tracking-tighter leading-tight">
            Why Choose <br />
            <span className="text-accent italic drop-shadow-lg">
              Saveetha Amaravati?
            </span>
          </h2>

          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Discover what sets our university apart in delivering world-class
            education
          </p>
        </motion.div>

        {/* Feature Grid - Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {data.reasons.map((reason, i) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              whileHover={{
                y: -15,
                boxShadow: "0 20px 40px rgba(161, 42, 42, 0.3)",
              }}
              className="group relative"
            >
              {/* Card Background with gradient border effect */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-secondary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group-hover:border-accent/60 transition-all duration-500 h-full flex flex-col">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-linear-to-br from-accent to-secondary text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                  {ICON_MAP[reason.icon] || <FaGraduationCap />}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-light grow group-hover:text-white/90 transition-colors">
                  {reason.desc}
                </p>

                {/* Accent Line on Hover */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "3rem" }}
                  className="mt-4 h-1 bg-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-32"
        >
          {/* Stats background card */}
          <div className="absolute inset-0 bg-linear-to-r from-accent/20 via-secondary/10 to-accent/20 rounded-3xl blur-2xl" />

          <div className="relative bg-white/8 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="text-accent">Achievement</span>
              </h3>
              <p className="text-white/60 mt-2 text-lg">
                Trusted by thousands of students worldwide
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {data.stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="relative inline-block overflow-hidden px-4">
                    {/* Stat Number */}
                    <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent via-white to-accent mb-3 tracking-tighter">
                      <Counter value={stat.number} />
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      animate={{ left: ["-100%", "200%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "linear",
                        repeatDelay: 3,
                      }}
                      className="absolute top-0 w-full h-full bg-linear-to-r from-transparent via-accent/40 to-transparent skew-x-[-25deg]"
                    />
                  </div>

                  {/* Stat Label */}
                  <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-[0.3em] mt-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
