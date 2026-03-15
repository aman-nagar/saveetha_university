// src/components/public/AnnouncementPopup.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdClose, MdCheckCircle } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";

const MotionLink = motion(Link);

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Show popup after 800ms delay on every page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Popup Container - Mobile First */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
          >
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Section with Gradient */}
              <div className="relative bg-linear-to-br from-primary via-[#0e2d61] to-accent px-4 sm:px-6 md:px-8 py-4 sm:py-8 md:py-10 text-white overflow-hidden">
                {/* Animated Background Shapes */}
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -mr-16 sm:-mr-24 -mt-16 sm:-mt-24"
                />
                <motion.div
                  animate={{ opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-0 left-0 w-24 sm:w-40 h-24 sm:h-40 bg-white/5 rounded-full -ml-12 sm:-ml-20 -mb-12 sm:-mb-20"
                />

                {/* Close Button */}
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleClose}
                  type="button"
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 p-3 sm:p-2 hover:bg-white/20 rounded-full transition-colors z-20 active:bg-white/30"
                >
                  <MdClose size={24} className="sm:w-5 sm:h-5" />
                </motion.button>

                {/* Header Content */}
                <div className="relative z-10 pr-8">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block mb-3 sm:mb-4"
                  >
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 rounded-full border border-white/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      <span className="animate-pulse">●</span> Limited Time
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-heading font-black mb-1 sm:mb-2 leading-tight"
                  >
                    B.Ed Admission 2026-28
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/85 text-xs sm:text-sm md:text-base font-light"
                  >
                    Seats Now Available • All Categories Welcome
                  </motion.p>
                </div>
              </div>

              {/* Body Content - Mobile First */}
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
                {/* Main Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed font-light"
                >
                  Join our prestigious teacher education institution and make a
                  difference with world-class faculty, modern infrastructure,
                  and comprehensive placements.
                </motion.p>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4"
                >
                  {[
                    "Multiple specializations available",
                    "100% placement assistance",
                    "Scholarship opportunities",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700"
                    >
                      <MdCheckCircle
                        className="text-accent shrink-0 mt-0.5"
                        size={16}
                      />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Stats Bar - Stack on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-linear-to-r from-primary/5 to-accent/5 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-3 sm:mb-4 border border-primary/10"
                >
                  <div className="flex items-center justify-between">
                    {/* Years Stat */}
                    <div className="flex-1 text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary leading-none">
                        15+
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        Years
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gray-300 mx-1"></div>

                    {/* Placements Stat */}
                    <div className="flex-1 text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary leading-none">
                        100%
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        Placements
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gray-300 mx-1"></div>

                    {/* Alumni Stat */}
                    <div className="flex-1 text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-accent leading-none">
                        5000+
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">
                        Alumni
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Deadline Alert */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-4 mb-3 sm:mb-4"
                >
                  <p className="text-[10px] sm:text-xs md:text-sm text-red-900 font-semibold">
                    ⏰ Admission closes{" "}
                    <span className="text-red-700 font-black">
                      31st March 2026
                    </span>
                  </p>
                </motion.div>

                {/* Buttons - Stack on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
                >
                  <MotionLink
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    to="/contact"
                    className="flex-1 bg-linear-to-r from-primary to-accent text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-center text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 hover:shadow-lg transition-all"
                  >
                    Apply Now <BiRightArrowAlt size={16} />
                  </MotionLink>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="flex-1 border-2 border-primary text-primary font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-primary/5 text-xs sm:text-sm md:text-base transition-all"
                  >
                    Dismiss
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
