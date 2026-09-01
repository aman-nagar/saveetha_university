// src/components/public/AnnouncementPopup.jsx
// NOTE: The backend /admin/popup_image.php requires auth for GET requests.
// As a workaround, the admin panel (PopupImageTab) stores the URL in
// localStorage under "sau_popup_image_url" when the image is loaded/uploaded.
// The public popup reads from there — no auth token needed.
// When the backend makes the GET endpoint public, replace with a direct API call.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const STORAGE_KEY = "sau_popup_image_url";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Read the URL cached by the admin panel (no API call needed — no auth issues)
    const url = localStorage.getItem(STORAGE_KEY);
    if (url) {
      setImageUrl(url);
      // Show popup after short delay
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
    // If nothing in storage → popup stays hidden
  }, []);

  const handleClose = () => setIsOpen(false);

  // Don't render if no image URL stored
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-[#0b1f4b]/80 backdrop-blur-sm"
          />

          {/* Scroll container — mobile-safe */}
          <div className="fixed inset-0 z-[101] overflow-y-auto flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-lg my-auto rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close announcement"
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.50)" }}
              >
                <MdClose size={20} />
              </button>

              {/* Image area */}
              <div
                className="relative w-full bg-[#0b1f4b]"
                style={{ minHeight: imageLoaded ? 0 : "320px" }}
              >
                {/* Loading spinner */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
                  </div>
                )}

                <img
                  src={imageUrl}
                  alt="University Announcement"
                  className="w-full h-auto block"
                  style={{ display: imageLoaded ? "block" : "none" }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    // Broken image — remove from storage and hide popup
                    localStorage.removeItem(STORAGE_KEY);
                    setIsOpen(false);
                  }}
                />
              </div>

              {/* Dismiss strip */}
              <button
                onClick={handleClose}
                className="w-full py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                style={{
                  background: "#0b1f4b",
                  color: "rgba(255,255,255,0.40)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.40)")
                }
              >
                Close Notice
              </button>

              {/* Brand accent stripe */}
              <div
                className="h-1"
                style={{
                  background:
                    "linear-gradient(to right, #0b1f4b, #a12a2a, #f59e0b, #a12a2a, #0b1f4b)",
                }}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
