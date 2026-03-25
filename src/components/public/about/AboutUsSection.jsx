import { useState } from "react";

export default function AboutUsSection({ data }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const {
    heading = "About Us",
    content = "Welcome to Saveetha Amaravati University...",
    tagline = "SA: A GATEWAY TO HIGHER EDUCATION",
  } = data || {};

  return (
    <section className="w-full">
      {/* 1. TOP SECTION: PARALLAX INTRO */}

      <div className="pattern-about-us relative pt-24 md:pt-32 pb-20 md:pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-10 tracking-tight">
            {heading}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-10"></div>
          <p className="text-white/90 text-sm md:text-lg leading-loose mb-8 font-light">
            {showFullContent ? content : content.substring(0, 450) + "..."}
          </p>
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="group text-accent hover:text-white font-bold transition-all text-sm uppercase tracking-widest flex items-center gap-3 mx-auto border border-accent/40 px-6 py-2 rounded-full hover:bg-accent mb-12"
          >
            {showFullContent ? "Read Less" : "Read More"}
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
