// src/components/public/AnnouncementPopup.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdGavel, MdLanguage } from "react-icons/md";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Softened to slate for a more premium glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative border border-slate-100">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-rose-600 hover:text-white rounded-full transition-all duration-300 z-10"
              >
                <MdClose size={20} />
              </button>

              {/* Deep Navy Top Banner with Gold Text */}
              <div className="bg-indigo-950 py-4 px-6 text-center shadow-sm">
                <h2 className="text-xl sm:text-2xl font-heading font-black text-amber-400 uppercase tracking-tight">
                  Saveetha Amaravati University
                </h2>
              </div>

              {/* Body Content */}
              <div className="p-8 sm:p-10 text-center">
                {/* Rose Legal Notice Label (Authoritative but modern) */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <MdGavel className="text-rose-700" size={24} />
                  <h3 className="text-xl sm:text-2xl font-black text-rose-700 uppercase tracking-wide">
                    Legal Notice: —
                  </h3>
                </div>

                {/* Main Text Content */}
                <div className="space-y-6">
                  <p className="text-slate-700 text-lg sm:text-xl leading-relaxed font-medium">
                    This website{" "}
                    <a
                      href="https://www.saveethaamaravatiuniversity.ac.in"
                      className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors break-all"
                    >
                      www.saveethaamaravatiuniversity.ac.in
                    </a>{" "}
                    is the official and authentic website of
                    <span className="font-bold text-slate-900 ml-1">
                      Saveetha Amaravati University.
                    </span>
                  </p>

                  <div className="h-px w-20 bg-slate-200 mx-auto" />

                  <p className="text-slate-500 text-base sm:text-lg leading-relaxed italic">
                    Any use of other similar or imitation websites may lead to
                    legal action by the University.
                  </p>
                </div>

                {/* Action Button - Deep Indigo */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="mt-10 w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  <MdLanguage size={18} />
                  Proceed to Official Site
                </motion.button>
              </div>

              {/* Bottom Decorative Element - Gold to Indigo gradient */}
              <div className="h-2 bg-gradient-to-r from-amber-400 via-indigo-500 to-indigo-950" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
