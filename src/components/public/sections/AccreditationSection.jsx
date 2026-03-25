import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import { Link } from "react-router-dom";

export default function AccreditationSection() {
  const { home } = usePublicContent();
  const data = home?.accreditationSection;

  if (!data) return null;

  return (
    <section className="relative py-24 px-4 bg-slate-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="text-accent uppercase tracking-widest text-xs font-bold">
              Recognitions
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black text-primary mb-6 leading-tight"
          >
            {data.title} <span className="text-accent">{data.highlight}</span>
          </motion.h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        {/* Floating Seal Cards Grid */}
        {/* Note: gap-y-16 is large because the logos float above the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12">
          {data.approvals.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-full" />

              {/* Background Watermark Image */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                <img
                  src={item.logo}
                  alt=""
                  className="w-64 h-64 object-contain grayscale scale-150"
                  aria-hidden="true"
                />
              </div>

              {/* The Floating Seal (Logo) */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center p-4 border border-slate-50 group-hover:-translate-y-2 transition-transform duration-500 z-20">
                <img
                  src={item.logo}
                  alt={`${item.title} Logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Card Content Area */}
              <div className="relative z-10 px-8 pb-8 pt-16 flex flex-col flex-grow text-center">
                <h4 className="text-primary font-bold text-xl leading-snug mb-6 min-h-[3.5rem] flex items-center justify-center">
                  {item.title}
                </h4>

                <div className="w-12 h-px bg-slate-200 mx-auto mb-6 group-hover:bg-accent/50 transition-colors duration-500" />

                {/* Links / Actionable Documents */}
                <div className="space-y-3 mt-auto flex flex-col items-center w-full">
                  {item.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.url || "#"}
                      className="group/link flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-primary hover:text-white text-slate-600 text-sm font-semibold transition-all duration-300 border border-slate-100 hover:border-primary"
                    >
                      <span className="truncate">{link.label || link}</span>
                      {/* Sleek Arrow Icon */}
                      <svg
                        className="w-4 h-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
