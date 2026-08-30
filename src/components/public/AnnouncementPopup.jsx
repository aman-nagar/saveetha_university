// src/components/public/AnnouncementPopup.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdWarning,
  MdVerified,
  MdBlock,
  MdGavel,
  MdOpenInNew,
} from "react-icons/md";
import { FaShieldAlt, FaUniversity } from "react-icons/fa";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  const fraudulentDomains = [
    "www.saveethamaravaniuniversity.org",
    "www.saveethamaramatiuniversity.co.in",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm"
          />

          {/* Modal wrapper — full viewport, scrollable on small screens */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg my-auto rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10"
              style={{ background: "linear-gradient(160deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)" }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close notice"
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-600 text-white/70 hover:text-white transition-all duration-200"
              >
                <MdClose size={18} />
              </button>

              {/* ── TOP HEADER STRIPE ── */}
              <div className="relative px-4 pt-6 pb-4 text-center border-b border-white/10">
                {/* Glow orb */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-24 bg-amber-400/10 rounded-full blur-3xl" />
                </div>

                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 mb-3">
                  <FaUniversity className="text-amber-400" size={22} />
                </div>

                <h1 className="text-base sm:text-lg font-black text-amber-400 uppercase tracking-widest leading-tight">
                  Saveetha Amaravati University
                </h1>
                <p className="text-white/50 text-[11px] mt-1 font-medium tracking-wider uppercase">
                  Andhra Pradesh — Official Communication
                </p>
              </div>

              {/* ── WARNING BANNER ── */}
              <div className="flex items-center gap-3 px-4 py-3 bg-rose-600/20 border-b border-rose-500/20">
                <MdWarning className="text-rose-400 shrink-0" size={22} />
                <p className="text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">
                  ⚠️ Important Public Notice
                </p>
              </div>

              {/* ── BODY ── */}
              <div className="px-4 sm:px-6 py-5 space-y-5">

                {/* Official Website */}
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <MdVerified className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                    <div className="space-y-1.5">
                      <p className="text-white/90 text-xs sm:text-sm font-semibold leading-snug">
                        The University's only <span className="text-emerald-400">official & authentic</span> website is:
                      </p>
                      <a
                        href="https://www.saveethaamaravatiuniversity.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-300 font-bold text-sm sm:text-base hover:text-emerald-200 transition-colors break-all"
                      >
                        www.saveethaamaravatiuniversity.ac.in
                        <MdOpenInNew size={14} className="shrink-0" />
                      </a>
                      <div>
                        <a
                          href="https://www.whois.com/whois/saveethaamaravatiuniversity.ac.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-[11px] transition-colors break-all"
                        >
                          <MdVerified size={11} />
                          Verify domain registration via WHOIS
                          <MdOpenInNew size={10} className="shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body paragraphs */}
                <p className="text-white/70 text-[12px] sm:text-[13px] leading-relaxed">
                  The University has become aware that certain <span className="text-rose-300 font-semibold">unauthorized websites</span> are
                  using the name and identity of Saveetha Amaravati University without permission.
                  Complaints have been lodged with the appropriate authorities regarding the following
                  fraudulent domains:
                </p>

                {/* Fraudulent domains */}
                <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <MdBlock className="text-rose-400 shrink-0" size={16} />
                    <span className="text-rose-300 text-[11px] font-bold uppercase tracking-widest">
                      Fraudulent / Unauthorized Domains
                    </span>
                  </div>
                  {fraudulentDomains.map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center gap-2.5 bg-rose-500/10 rounded-lg px-3 py-2 border border-rose-500/15"
                    >
                      <MdBlock className="text-rose-500 shrink-0" size={14} />
                      <span className="text-rose-300/80 font-mono text-xs break-all">{domain}</span>
                    </div>
                  ))}
                </div>

                {/* Warning advisory */}
                <div className="rounded-xl bg-amber-400/8 border border-amber-400/20 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <FaShieldAlt className="text-amber-400 shrink-0 mt-0.5" size={15} />
                    <p className="text-amber-200/80 text-[12px] sm:text-[13px] leading-relaxed">
                      Students and parents are <span className="text-amber-300 font-bold">strongly advised</span> not to
                      make any payments, submit documents, or rely upon information provided through any
                      website other than the University's official website.
                    </p>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-white/45 text-[11px] sm:text-[12px] leading-relaxed border-t border-white/8 pt-4">
                  The University shall <span className="text-white/60 font-semibold">not be held responsible</span> for
                  any loss, fraud, misrepresentation, or inconvenience arising from dealings with
                  unauthorized websites, entities, or individuals.
                </p>

                {/* Signatory */}
                <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/25 flex items-center justify-center shrink-0">
                    <MdGavel className="text-amber-400" size={15} />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs font-bold leading-tight">Registrar</p>
                    <p className="text-white/45 text-[11px] leading-tight">
                      Saveetha Amaravati University, Andhra Pradesh
                    </p>
                  </div>
                </div>
              </div>

              {/* ── FOOTER BUTTON ── */}
              <div className="px-4 sm:px-6 pb-5 space-y-2.5">
                <motion.a
                  href="https://www.saveethaamaravatiuniversity.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all"
                >
                  <MdVerified size={17} />
                  Visit Official Website
                </motion.a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl text-white/40 hover:text-white/70 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white/5"
                >
                  I Understand — Close Notice
                </button>
              </div>

              {/* Bottom accent stripe */}
              <div className="h-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-rose-500" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
