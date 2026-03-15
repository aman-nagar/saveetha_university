// src/pages/public/GalleryPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/usePublicContent";
import { MdArrowForward } from "react-icons/md";

export default function GalleryPage() {
  const { content } = usePublicContent();
  const data = content?.galleryPage;

  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* HERO HEADER SECTION */}
      <div className="relative bg-linear-to-br from-primary via-primary to-accent overflow-hidden pt-10 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-semibold uppercase tracking-widest">
                ✨ Visual Memories
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-tight"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl font-light  mx-auto"
          >
            Explore moments from our campus life, events, and celebrations
          </motion.p>
        </div>
      </div>

      {/* GALLERY GRID SECTION */}
      <div className="relative -mt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {data.albums.map((album, i) => (
              <motion.div
                key={album.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-gray-200">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-white font-semibold cursor-pointer"
                      >
                        View Gallery <MdArrowForward size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Text Area with Theme Gradient */}
                  <div className="flex-1 p-6 bg-linear-to-br from-primary/95 to-accent/95 flex items-center justify-center">
                    <h3 className="text-white font-bold text-center text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {album.title}
                    </h3>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-1 bg-linear-to-r from-accent to-transparent group-hover:h-2 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CALL TO ACTION SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-linear-to-r from-primary to-accent py-16 px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          More Memories Coming Soon
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Follow us on social media to stay updated with the latest events and
          celebrations
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          Follow Us
        </motion.button>
      </motion.div>
    </div>
  );
}
