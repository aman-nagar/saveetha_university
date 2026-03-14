import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * Particle Generator Component
 * Creates animated particle effects with varied speeds and opacity
 */
function ParticleField() {
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
          }}
          animate={{
            x: `${particle.x + particle.direction * 15}%`,
            y: `${particle.y - 10}%`,
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute rounded-full ${
            particle.size > 2 ? "bg-accent" : "bg-white"
          }`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter:
              particle.size > 2
                ? "drop-shadow(0 0 4px #a12a2a)"
                : "drop-shadow(0 0 2px rgba(255,255,255,0.8))",
          }}
        />
      ))}
    </div>
  );
}

export default function ResearchSection() {
  const { home } = usePublicContent();
  const data = home?.researchSection;

  if (!data) return null;

  return (
    <section className="relative w-full min-h-[700px] flex items-center overflow-hidden bg-primary">
      {/* BASE: Radial Gradient Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(161,42,42,0.05)_0%,rgba(11,31,75,0.3)_100%)]" />

      {/* LAYER 1: Technical Grid Pattern (Subtle) */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(161,42,42,0.04) 1px, transparent 1px),
            linear-gradient(0deg, rgba(161,42,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 200px 200px, 200px 200px",
        }}
      />

      {/* LAYER 2: Animated Scanner Line */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            top: ["-100%", "150%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />
      </div>

      {/* LAYER 3: Particle Field (Data Fragments) */}
      <ParticleField />

      {/* LAYER 4: Soft Accent Glow */}
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0 pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      {/* LAYER 5: CONTENT - Text & Visual */}
      <div className="container mx-auto max-w-7xl relative z-10 px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text Content with Glass Container */}
        <motion.div
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glass Background Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10">
            {/* Label */}
            <motion.span
              className="text-accent font-bold tracking-[0.3em] text-xs mb-6 block uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              ◆ Innovation Hub
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              className="text-3xl md:text-5xl font-heading font-black text-white leading-tight tracking-tighter mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {data.title} <br />
              <span className="text-accent uppercase italic tracking-wider">
                {data.highlight}
              </span>
            </motion.h2>

            {/* Accent Line */}
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-accent to-accent/50 my-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />

            {/* Description */}
            <motion.p
              className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {data.content}
            </motion.p>

            {/* CTA Button - Premium Style */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 overflow-hidden rounded-xl bg-accent text-primary font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Research
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Abstract Futuristic Visual */}
        <motion.div
          className="flex-1 relative hidden lg:flex justify-center items-center min-h-[500px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full border-2 border-dashed border-accent/20"
          />

          {/* Middle Rotating Ring (Counter) */}
          <motion.div
            animate={{ rotate: -180 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 rounded-full border-2 border-accent/40"
          />

          {/* Inner Core with Pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative w-40 h-40 rounded-full border-2 border-accent/60 flex items-center justify-center bg-white/5 backdrop-blur-sm"
          >
            <span className="text-accent text-4xl font-black">AIU</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-solid border-transparent border-t-accent border-r-accent/50"
            />
          </motion.div>

          {/* Orbital Data Points */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.cos((i * Math.PI) / 3) * 120, 0],
                y: [0, Math.sin((i * Math.PI) / 3) * 120, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-3 h-3 bg-accent rounded-full shadow-lg"
              style={{
                filter: "drop-shadow(0 0 6px #a12a2a)",
              }}
            />
          ))}

          {/* Floating Data Fragments */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`frag-${i}`}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
              style={{
                top: `${15 * i}%`,
                left: `${10 + i * 12}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
