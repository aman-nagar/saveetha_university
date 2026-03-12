import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  FaGraduationCap,
  FaIndustry,
  FaMicroscope,
  FaChalkboardTeacher,
} from "react-icons/fa";
import canvasConfetti from "canvas-confetti";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * Reusable Counter Component with Spring Physics
 * and Achievement Trigger for Confetti
 */
function Counter({ value, triggerConfetti = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parse numeric value and keep suffix (e.g., "5000+" -> 5000, "+")
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
      const rounded = Math.floor(latest);
      setDisplayValue(rounded);

      // Fire celebration when target reached
      if (triggerConfetti && rounded >= numericValue && isInView) {
        const end = Date.now() + 1000;
        const colors = ["#c9a227", "#ffffff", "#0b1f4b"]; // Gold, White, Navy

        (function frame() {
          canvasConfetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: colors,
          });
          canvasConfetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: colors,
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }
    });
  }, [springValue, triggerConfetti, numericValue, isInView]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * WhyUS Component
 * Displays reasons why students should choose this institution
 * Data from context: home.about (reasons and stats)
 */
export default function WhyUs() {
  const { home } = usePublicContent();
  
  // Default reasons
  const DEFAULT_REASONS = [
    {
      title: "Academic Excellence",
      icon: <FaGraduationCap />,
      desc: "Comprehensive programs in Management, Law, and Tech, guided by experts who prioritize high-quality educational standards.",
      delay: 0.1,
    },
    {
      title: "Industry-Oriented",
      icon: <FaIndustry />,
      desc: "Our curriculum bridges the gap between classroom theory and real-world industrial application for career readiness.",
      delay: 0.2,
    },
    {
      title: "Modern Infrastructure",
      icon: <FaChalkboardTeacher />,
      desc: "State-of-the-art labs, expansive libraries, and sports complexes designed for a holistic student experience.",
      delay: 0.3,
    },
    {
      title: "Research & Innovation",
      icon: <FaMicroscope />,
      desc: "Promoting a culture of discovery through dedicated research centers and collaborations with global leaders.",
      delay: 0.4,
    },
  ];

  // Default stats
  const DEFAULT_STATS = [
    { number: "50+", label: "Programs" },
    { number: "100+", label: "Expert Faculty" },
    { number: "5000+", label: "Alumni", celebrate: true },
    { number: "25+", label: "Research Centers" },
  ];

  const aboutData = home?.about;
  const REASONS = aboutData?.reasons?.length > 0 ? aboutData.reasons : DEFAULT_REASONS;
  const STATS = aboutData?.stats?.length > 0 ? aboutData.stats : DEFAULT_STATS;

  return (
    <section className="relative py-24 px-4 bg-primary overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-6">
            Why <span className="text-accent italic">Choose Us</span>?
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6" />
        </motion.div>

        {/* Bento-style Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: reason.delay || 0.1 * i }}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-accent/40 transition-all group"
            >
              <div className="w-12 h-12 bg-accent text-primary rounded-xl flex items-center justify-center text-xl mb-6 shadow-[0_0_20px_rgba(201,162,39,0.3)] group-hover:rotate-12 transition-transform">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center relative group">
              {/* The Gold Shine Effect on Numbers */}
              <div className="relative inline-block overflow-hidden">
                <div className="text-4xl md:text-6xl font-black text-accent mb-2 tracking-tighter">
                  <Counter
                    value={stat.number}
                    triggerConfetti={stat.celebrate}
                  />
                </div>
                {/* Shine Overlay */}
                <motion.div
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
                />
              </div>

              <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50%" }}
                className="h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
