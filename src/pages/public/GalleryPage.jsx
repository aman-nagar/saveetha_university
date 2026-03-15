// src/pages/public/GalleryPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";

export default function GalleryPage() {
  const { content } = usePublicContent();
  const data = content?.galleryPage;

  console.log(content);
  console.log(data);
  if (!data) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* 1. SECTION HEADER (Navy Background with Diamond Title) */}
      <div className="bg-primary pt-32 pb-24 px-4 text-center relative overflow-hidden">
        {/* Diamond Title Decoration (Matches image_7e2478.jpg) */}
        <div className="relative inline-block px-12 py-3">
          <div className="absolute inset-0 border-y border-white/30"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary border border-white/30 rotate-45 -ml-4"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary border border-white/30 rotate-45 -mr-4"></div>

          <h1 className="text-4xl md:text-5xl font-heading font-black text-white relative z-10 uppercase tracking-widest">
            {data.title}
          </h1>
        </div>
      </div>

      {/* 2. GALLERY GRID */}
      <div className="container mx-auto max-w-7xl px-4 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.albums.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white shadow-xl overflow-hidden group border border-gray-100"
            >
              {/* Image Container with Slanted Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Slanted White Mask (Matches image_7e2478.jpg) */}
                <div
                  className="absolute bottom-0 left-0 w-full h-12 bg-white"
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                ></div>
              </div>

              {/* Text Area */}
              <div className="p-2">
                <h3 className="text-gray-800 font-bold text-sm h-12 line-clamp-2 leading-snug ">
                  {album.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
