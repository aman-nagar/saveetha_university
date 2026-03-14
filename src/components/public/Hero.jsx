// src/components/public/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import demoImage from "../../assets/images/demoImage.jpeg";
import { Link } from "react-router-dom";

export default function Hero() {
  const { home } = usePublicContent();
  const heroData = home?.hero;

  if (!heroData) return null;

  const { title, subtitle, description, backgroundImage, ctaButtons } = heroData;

  return (
    <section className="min-h-[80vh] md:h-[80vh] bg-primary text-white overflow-hidden relative flex flex-col md:flex-row">
      
      {/* LEFT CONTENT: Centered text area */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-8 md:p-16 lg:p-24">
        {/* Optional background for text readability if needed */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {subtitle && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-accent font-bold text-sm uppercase tracking-[0.3em] mb-4"
              >
                {subtitle}
              </motion.span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight mb-6 tracking-tighter">
              {title}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-10 font-light">
              {description}
            </p>

            {ctaButtons && ctaButtons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 flex-wrap"
              >
                {ctaButtons.map((button, idx) => (
                  <Link
                    key={idx}
                    to={button.url || "#"} // FIXED: to instead of href
                    className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg ${
                      button.variant === "secondary"
                        ? "border-2 border-accent text-accent hover:bg-accent hover:text-primary"
                        : "bg-accent text-primary hover:bg-white"
                    }`}
                  >
                    {button.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* RIGHT IMAGE: Full height, Half width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 w-full h-[400px] md:h-full relative overflow-hidden"
      >
        <img
          src={demoImage}
          alt="Campus Excellence"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle Navy Gradient Overlay to blend text with image on small screens */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-transparent to-transparent opacity-60 md:opacity-30"></div>
      </motion.div>
      
    </section>
  );
}