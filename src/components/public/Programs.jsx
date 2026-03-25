import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";

export default function Programs() {
  const { home } = usePublicContent();
  const programsData = home?.programs;

  // 6 Default programs for a perfect 3-column grid
  const defaultPrograms = [
    {
      name: "Management",
      description:
        "Develop leadership and strategic skills for the modern global business environment.",
      duration: "2 Years",
      code: "MGT",
    },
    {
      name: "Faculty of Science",
      description:
        "Advance your knowledge through rigorous research and practical laboratory work.",
      duration: "3 Years",
      code: "SCI",
    },
    {
      name: "Engineering",
      description:
        "Build the future with cutting-edge technology and innovative design principles.",
      duration: "4 Years",
      code: "ENG",
    },
    {
      name: "Agriculture",
      description:
        "Learn sustainable farming, agribusiness, and modern agricultural sciences.",
      duration: "4 Years",
      code: "AGR",
    },
    // Added 2 New Programs
    {
      name: "Computer Science",
      description:
        "Master software development, artificial intelligence, and complex data analytics.",
      duration: "3 Years",
      code: "CSE",
    },
    {
      name: "Faculty of Law",
      description:
        "Comprehensive legal education focusing on corporate, criminal, and international law.",
      duration: "3 Years",
      code: "LAW",
    },
  ];

  const programs = programsData?.length > 0 ? programsData : defaultPrograms;

  return (
    <section className="py-24 bg-bg relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="text-accent uppercase tracking-widest text-xs font-bold">
              Academics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-primary mb-6 leading-tight">
            Our Programs
          </h2>
          <p className="text-muted text-base md:text-lg font-medium">
            Explore industry-relevant courses designed to foster innovation,
            critical thinking, and real-world success.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-surface border border-border/50 rounded-3xl p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Decorative Watermark Code */}
              <div className="absolute -top-4 -right-4 text-8xl font-black text-border/30 group-hover:text-accent/5 transition-colors duration-500 pointer-events-none select-none z-0">
                {program.code || program.name.substring(0, 3).toUpperCase()}
              </div>

              {/* Top Section */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="w-12 h-1 bg-accent/20 group-hover:bg-accent rounded-full transition-colors duration-500 mb-6" />
                <h3 className="font-heading font-black text-2xl text-primary mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                  {program.name}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-medium">
                  {program.description}
                </p>
              </div>

              {/* Bottom Section (Duration & Link) */}
              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-border/50 mt-auto">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">
                    {program.duration || "Varies"}
                  </span>
                </div>

                <button className="flex items-center gap-2 text-primary group-hover:text-accent text-sm font-bold transition-colors">
                  Details
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
