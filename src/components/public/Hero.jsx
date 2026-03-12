// src/components/public/Hero.jsx
import React from "react";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * Hero Component
 * Displays main hero section with title, description, and CTA buttons
 * Data from context: home.hero
 */
export default function Hero() {
  const { home } = usePublicContent();
  const heroData = home?.hero;

  // Default hero if no data available
  const defaultHero = {
    title: "Shaping Futures Through Quality Education",
    description:
      "Industry-oriented programs, experienced faculty, and a modern campus designed for tomorrow's leaders.",
    backgroundImage:
      "https://saveethaamaravatiuniversity.ac.in/uploads/slider__17705748893.jpg",
    ctaButtons: [
      { text: "Apply Now", variant: "primary", link: "/apply" },
      { text: "Explore Programs", variant: "secondary", link: "/programs" },
    ],
  };

  const hero = heroData || defaultHero;

  if (!hero) return null;

  return (
    <section className="h-[70vh] bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
            {hero.title}
          </h1>

          <p className="mt-6 text-white/90 text-lg">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          {hero.ctaButtons && hero.ctaButtons.length > 0 && (
            <div className="mt-8 flex gap-4 flex-wrap">
              {hero.ctaButtons.map((button, idx) => (
                <button
                  key={idx}
                  onClick={() => button.link && (window.location.href = button.link)}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    button.variant === "secondary"
                      ? "border border-white text-white hover:bg-white hover:text-primary"
                      : "bg-secondary hover:bg-secondary/90 text-white"
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right image */}
        {hero.backgroundImage && (
          <div className="hidden md:block">
            <img
              src={hero.backgroundImage}
              alt="Campus"
              className="rounded-xl shadow-lg object-cover w-full h-96"
            />
          </div>
        )}
      </div>
    </section>
  );
}
