import React, { useState, useEffect, useRef } from "react";
import { usePublicContent } from "../../hooks/usePublicContent";
import { motion, useInView } from "framer-motion";

/**
 * Compact Glassmorphic Stats with Auto-Counter
 */
export default function Stats() {
  const { home } = usePublicContent();
  const statsItems = home?.stats?.items || [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (statsItems.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative w-full bg-primary py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsItems.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} trigger={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Card Component with Local Counter
 */
function StatCard({ stat, index, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trigger) {
      let start = 0;
      const end = parseInt(stat.value);
      if (start === end) return;

      let totalMilisecondsStep = 2000; // Duration of animation (2 seconds)
      let incrementTime = (totalMilisecondsStep / end) * 2;

      let timer = setInterval(
        () => {
          start += Math.ceil(end / 100); // Speed up the increments
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        },
        Math.max(incrementTime, 20),
      );

      return () => clearInterval(timer);
    }
  }, [trigger, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={trigger ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-default"
    >
      {/* Small Compact Glass Card */}
      <div className="relative overflow-hidden h-32 md:h-40 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:bg-white/15 group-hover:border-accent/50 shadow-lg">
        {/* Shiny Highlight Overlay */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />

        {/* Counter Number */}
        <div className="text-3xl md:text-4xl font-heading font-black text-white">
          {count}
          <span className="text-accent ml-0.5">{stat.suffix}</span>
        </div>

        {/* Label */}
        <div className="text-white/60 font-medium uppercase tracking-wider text-[9px] md:text-xs text-center mt-2 group-hover:text-white transition-colors">
          {stat.label}
        </div>

        {/* Bottom Accent Glow Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
