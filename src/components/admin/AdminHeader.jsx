// src/components/admin/AdminHeader.jsx
import { useLocation, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

const routeTitles = {
  "/admin": "Overview",
  "/admin/students": "Student Directory",
  "/admin/students/add": "New Admission",
  "/admin/site-settings": "Configuration",
};

export default function AdminHeader() {
  const location = useLocation();
  const path = location.pathname;

  const parts = path.split("/").filter(Boolean);
  let breadcrumb = [];
  let accumulatedPath = "";

  parts.forEach((part) => {
    accumulatedPath += `/${part}`;
    breadcrumb.push({
      label:
        routeTitles[accumulatedPath] ||
        part.charAt(0).toUpperCase() + part.slice(1),
      path: accumulatedPath,
    });
  });

  const pageTitle =
    routeTitles[path] ||
    breadcrumb[breadcrumb.length - 1]?.label ||
    "Admin Panel";

  // --- Scroll Progress Logic ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 1. Global Scroll Progress Bar - Matches University Gold */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <header className="sticky top-0 z-30 w-full bg-surface/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Left Side: Breadcrumb + Title */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="pl-12 lg:pl-0 flex flex-col min-w-0">
                <nav className="hidden sm:flex items-center space-x-2 text-xs font-medium text-muted mb-1">
                  {breadcrumb.map((item, index) => (
                    <div key={item.path} className="flex items-center">
                      {index !== 0 && (
                        <span className="mx-2 opacity-40">/</span>
                      )}
                      <Link
                        to={item.path}
                        className="hover:text-accent transition-colors"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </nav>

                <motion.h1
                  key={path}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg sm:text-2xl font-heading font-bold text-primary tracking-tight truncate"
                >
                  {pageTitle}
                </motion.h1>
              </div>
            </div>

            {/* Right Side: User Info */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs font-semibold text-primary leading-none">
                  Administrator
                </span>
                <span className="text-[10px] text-success flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                  System Online
                </span>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-primary to-primary/80 border-2 border-accent/20 flex items-center justify-center text-white font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
