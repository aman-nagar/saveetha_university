// src/components/public/AnnouncementPopup.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { publicApiRequest } from "@/api/public/publicApiRequest";

const PUBLIC_POPUP_ENDPOINT = "/public/popup_image.php";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // publicApiRequest returns json.data directly:
        // { title, popup_image_url, updated_at }
        const data = await publicApiRequest(PUBLIC_POPUP_ENDPOINT);
        if (cancelled) return;

        const url = data?.popup_image_url || null;
        if (url) {
          setImageUrl(url);
          setTimeout(() => {
            if (!cancelled) setIsOpen(true);
          }, 700);
        }
      } catch {
        // No active popup — stay hidden silently
      }
    })();

    return () => { cancelled = true; };
  }, []);

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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] bg-[#0b1f4b]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Scroll-safe centering wrapper */}
          <div className="fixed inset-0 z-[101] overflow-y-auto flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg my-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close announcement"
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <MdClose size={20} />
              </button>

              {/* Image */}
              <div
                className="relative w-full bg-[#0b1f4b]"
                style={{ minHeight: imageLoaded ? 0 : "300px" }}
              >
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
                  onError={() => setIsOpen(false)}
                />
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-[11px] font-bold uppercase tracking-widest transition-colors"
                style={{
                  background: "#0b1f4b",
                  color: "rgba(255,255,255,0.38)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                Close Notice
              </button>

              {/* Brand stripe */}
              <div
                className="h-1"
                style={{
                  background: "linear-gradient(to right, #0b1f4b, #a12a2a, #f59e0b, #a12a2a, #0b1f4b)",
                }}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
