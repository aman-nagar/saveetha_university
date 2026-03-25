import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import { Link } from "react-router-dom";

export default function AccreditationSection() {
  const { home } = usePublicContent();
  const data = home?.accreditationSection;

  if (!data) return null;

  return (
    <section className="pattern-accreditation relative py-24 px-4">
      <div className="absolute inset-0 bg-primary/10 z-0" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black text-white mb-6 uppercase tracking-tight"
          >
            {data.title} <span className="text-accent">{data.highlight}</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Wave Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.approvals.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-full group"
            >
              {/* TOP SECTION WITH WAVE EFFECT */}
              <div className={`relative h-56 ${item.color} flex items-center justify-center p-8`}>
                {/* Custom SVG Wave Mask */}
                <div className="absolute bottom-0 left-0 w-full leading-[0] transform translate-y-[1px]">
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20 fill-white">
                    <path d="M0,150 C150,50 350,250 500,150 L500,150 L0,150 Z"></path>
                  </svg>
                </div>
                
                {/* Secondary Wave for depth */}
                <div className="absolute bottom-4 left-0 w-full leading-[0] opacity-20 transform translate-y-[1px]">
                   <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-24 fill-black">
                    <path d="M0,150 C100,0 400,300 500,150 L500,150 L0,150 Z"></path>
                  </svg>
                </div>

                <img 
                  src={item.logo} 
                  alt="Logo" 
                  className="w-24 h-24 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-md" 
                />
              </div>

              {/* BOTTOM SECTION */}
              <div className="p-8 pt-2 flex flex-col items-center text-center flex-grow">
                <h4 className="text-primary font-bold text-lg leading-snug mb-4 min-h-[3rem] flex items-center">
                  {item.title}
                </h4>
                
                <div className="space-y-2 mt-auto">
                  {item.links.map((link, idx) => (
                    <Link 
                      key={idx}
                      to="#" 
                      className="block text-primary/60 hover:text-accent text-xs font-semibold transition-all hover:translate-x-1"
                    >
                      {link}
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