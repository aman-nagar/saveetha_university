import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpandAlt } from "react-icons/fa";
import { usePublicContent } from "@/hooks/usePublicContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

export default function AcademicPhotoGallery() {
  const { home } = usePublicContent();
  const data = home?.gallery;
  const [selectedImage, setSelectedImage] = useState(null);

  if (!data) return null;

  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-primary tracking-tight">
            {data.heading} <span className="text-accent">{data.highlight}</span>
          </h2>
          <div className="h-1.5 w-24 bg-accent mt-4 rounded-full mx-auto md:mx-0"></div>
          <p className="mt-6 text-muted  leading-relaxed">{data.description}</p>
        </div>

        {/* 1-Row Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative group cursor-pointer aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gray-100"
              onClick={() => setSelectedImage(image)}
              whileHover={{ y: -8 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">
                      {image.category || "University"}
                    </span>
                    <p className="text-white font-bold text-lg leading-tight">
                      {image.alt}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-accent text-primary shadow-lg">
                    <FaExpandAlt size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />

                <div className="bg-primary p-8 text-center">
                  <h4 className="text-white text-xl font-black italic uppercase tracking-wider">
                    {selectedImage.alt}
                  </h4>
                  <p className="text-accent text-sm font-bold mt-2 uppercase">
                    Saveetha Amravati University Archive
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 p-4 rounded-full bg-accent text-primary shadow-2xl"
                >
                  <FaTimes size={20} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
