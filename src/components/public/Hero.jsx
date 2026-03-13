// src/components/public/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import demoImage from "../../assets/images/demoImage.jpeg";

/**
 * Hero Component
 * Displays main hero section with title, description, and CTA buttons
 * Data from context: home.hero
 */
export default function Hero() {
  const { home } = usePublicContent();
  const heroData = home?.hero;

  if (!heroData) return null;

  const { title, subtitle, description, backgroundImage, ctaButtons } =
    heroData;

  return (
    <section className="h-[70vh] bg-primary text-white overflow-hidden relative">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 31, 75, 0.7), rgba(11, 31, 75, 0.7)), url(${backgroundImage})`,
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center h-full z-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-accent font-bold text-sm uppercase tracking-widest mb-4"
            >
              {subtitle}
            </motion.span>
          )}

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
            {title}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            {description}
          </p>

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 flex-wrap"
            >
              {ctaButtons.map((button, idx) => (
                <a
                  key={idx}
                  href={button.url || "#"}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
                    button.variant === "secondary"
                      ? "border-2 border-accent text-white hover:bg-accent hover:text-primary"
                      : "bg-accent hover:bg-accent/90 text-primary font-bold"
                  }`}
                >
                  {button.label}
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Right image - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <img
            src={demoImage}
            alt="Campus"
            className="rounded-2xl shadow-2xl object-cover w-full h-96"
          />
        </motion.div>
      </div>
    </section>
  );
}
