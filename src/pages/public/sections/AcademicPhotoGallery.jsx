// src/components/university/AcademicPhotoGallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpandAlt } from "react-icons/fa"; // Require react-icons

// Assuming this data comes from an API or prop
const GALLY_IMAGES = [
  {
    id: 1,
    src: "https://www.aryawartcollege.com/images/gallery1.jpg",
    alt: "University Event Group",
  },
  {
    id: 2,
    src: "https://www.aryawartcollege.com/images/gallery2.jpg",
    alt: "Students Presentation",
  },
  {
    id: 3,
    src: "https://www.aryawartcollege.com/images/gallery3.jpg",
    alt: "Official Ceremony",
  },
  {
    id: 4,
    src: "https://www.aryawartcollege.com/images/gallery4.jpg",
    alt: "Bus Tour Group",
  },
  {
    id: 5,
    src: "https://www.aryawartcollege.com/images/gallery5.jpg",
    alt: "Classroom Activity",
  },
  {
    id: 6,
    src: "https://www.aryawartcollege.com/images/gallery6.jpg",
    alt: "Faculty Meeting",
  },
  {
    id: 7,
    src: "https://www.aryawartcollege.com/images/gallery8.jpg",
    alt: "Dean and Staff",
  },
  {
    id: 8,
    src: "https://www.aryawartcollege.com/images/gallery8.jpg",
    alt: "Award Reception",
  },
  {
    id: 9,
    src: "https://www.aryawartcollege.com/images/gallery10.jpg",
    alt: "Student Leadership Team",
  },
];

// 1. Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Images fade in one after another
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
};

export default function AcademicPhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close the lightbox modal
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Section Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary tracking-tight">
            Photo <span className="text-accent">Gallery</span>
          </h2>
          <div className="h-1.5 w-24 bg-accent mt-3 rounded-full mx-auto md:mx-0"></div>
          <p className="mt-4  text-muted ">
            A visual journey through the vibrant student life, prestigious
            ceremonies, and innovative learning at our university.
          </p>
        </div>

        {/* 2. Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animate only once when 30% visible
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GALLY_IMAGES.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative group cursor-pointer aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white"
              onClick={() => setSelectedImage(image)}
              // 3. Hover Interactions
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Image with subtle pan on hover */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Black Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Caption & Expand Icon appearing on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                    {image.alt}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="p-2.5 rounded-full bg-accent/90 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
                  >
                    <FaExpandAlt size={16} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. Lightbox (Click to enlarge modal) */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox} // Click outside to close
              className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            >
              {/* Animation for the modal content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20, stiffness: 120 }}
                onClick={(e) => e.stopPropagation()} // Stop click-through
                className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/20"
              >
                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto object-contain max-h-[80vh]"
                />

                {/* Lightbox Footer (Navy Background) */}
                <div className="bg-primary p-6 text-center">
                  <h4 className="text-white text-lg font-bold">
                    {selectedImage.alt}
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    University Event Archive
                  </p>
                </div>

                {/* Close Button (Gold Accent) */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  onClick={closeLightbox}
                  className="absolute top-5 right-5 z-50 p-3 rounded-full bg-accent/90 text-primary shadow-xl"
                >
                  <FaTimes size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
