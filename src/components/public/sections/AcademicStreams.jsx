import React from "react";
import { motion } from "framer-motion";

const AcademicStreams = ({ data }) => {
  if (!data) return null;
  const { title, highlightTitle, subtitle, streams } = data;

  return (
    <section className="py-20 bg-bg px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {/* Mapping first 4 streams */}
          {streams.slice(0, 4).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}

          {/* Central Futuristic Title Card */}
          <div className="relative z-10 flex items-center justify-center p-8 bg-primary order-first lg:order-none h-64 lg:h-auto border-4 border-accent shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
            <div className="text-center">
              <span className="text-accent uppercase tracking-widest text-sm font-bold">
                {title}
              </span>
              <h2 className="text-white text-3xl md:text-4xl font-heading font-black my-2 leading-tight">
                {highlightTitle}
              </h2>
              <p className="text-white/70 italic">{subtitle}</p>
            </div>
          </div>

          {/* Mapping remaining 4 streams */}
          {streams.slice(4).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StreamCard = ({ stream }) => {
  return (
    <motion.div
      whileHover="hover"
      className="relative h-72 w-full overflow-hidden bg-surface group cursor-pointer border border-border/50"
    >
      {/* Background Image (Visible on Hover) */}
      <motion.div
        variants={{
          hover: { scale: 1.1, opacity: 1 },
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 31, 75, 0.85), rgba(11, 31, 75, 0.95)), url(${stream.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Default Bubble Pattern (visible when not hovered) */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-muted) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-center transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors duration-300">
          {stream.name}
        </h3>
        <p className="text-secondary text-sm font-semibold mt-1 mb-4 group-hover:text-white/90">
          ({stream.approval})
        </p>

        {/* Detail Levels - Hidden by default, slides up on hover */}
        <motion.div
          variants={{
            hover: { opacity: 1, y: 0 }
          }}
          initial={{ opacity: 0, y: 20 }}
          className="text-white/70 text-xs leading-relaxed border-t border-accent/30 pt-4"
        >
          {stream.levels}
        </motion.div>
      </div>

      {/* Decorative Corner (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent/10 group-hover:bg-accent transition-colors duration-300 transform rotate-45 translate-x-4 translate-y-4" />
    </motion.div>
  );
};

export default AcademicStreams;