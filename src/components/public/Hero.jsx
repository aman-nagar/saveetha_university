// src/components/public/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import demoImage from "../../assets/images/demoImage.jpeg";
import CTAButton from "@/components/ui/CTAButton"; // ← adjust path as needed
import { Link } from "react-router-dom";

export default function Hero() {
  const { home } = usePublicContent();
  const heroData = home?.hero;

  if (!heroData) return null;

  const { title, subtitle, description, backgroundImage, ctaButtons } =
    heroData;
  const heroBgImage = backgroundImage || demoImage;

  return (
    <section className="relative min-h-screen bg-primary text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Darker overlay + subtle blur for readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Extra gradient feel on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 md:hidden" />
      </div>

      {/* CONTENT – centered on all screens */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-accent sm:text-base"
              >
                {subtitle}
              </motion.p>
            )}

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/90 sm:mt-8 sm:text-xl md:text-2xl md:leading-relaxed">
              {description}
            </p>

            {ctaButtons?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-10 flex flex-wrap justify-center gap-5 sm:gap-6"
              >
                {ctaButtons.map((button, idx) => {
                  // Map your data's variant to CTAButton variant
                  let variant = "glass"; // Default to glass for hero section

                  if (button.variant === "secondary") {
                    variant = "secondary";
                  } else if (button.variant === "outline") {
                    variant = "outline";
                  } else if (button.variant === "primary") {
                    variant = "primary";
                  } else if (button.variant === "gradient") {
                    variant = "gradient";
                  } else if (button.variant === "minimal") {
                    variant = "minimal";
                  }

                  return (
                    <CTAButton key={idx} variant={variant} size="lg">
                      <Link
                        to={button.url || "#"}
                        className="block w-full h-full text-center"
                      >
                        {button.label}
                      </Link>
                    </CTAButton>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
