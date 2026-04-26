import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion"; 

const routeTitles = {
  "/admin": "Overview",
  "/admin/members": "Member Management",
  "/admin/students": "Student Directory",
  "/admin/students/add": "New Admission",
  "/member-dashboard": "Member Dashboard",
  "/admin/site-settings": "Configuration",
};

export default function AdminHeader() {
  const location = useLocation();
  const path = location.pathname;

  // Breadcrumb Logic
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

  return (
    <header className="sticky top-0 z-30 w-full h-[60px] flex items-center bg-surface/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Side: Breadcrumbs & Title */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Note: If your Hamburger button is absolutely positioned, 
               keep the pl-12 on mobile. If it's inline, remove it.
            */}
            <div className="pl-10 lg:pl-0 flex flex-col min-w-0">
              {/* Breadcrumbs */}
              <nav className="hidden sm:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-muted mb-0.5">
                {breadcrumb.map((item, index) => (
                  <div key={item.path} className="flex items-center">
                    {index !== 0 && <span className="mx-1.5 opacity-30">/</span>}
                    <Link
                      to={item.path}
                      className="hover:text-accent transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Page Title */}
              <motion.h1
                key={path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base sm:text-xl font-heading font-black text-primary dark:text-text tracking-tight truncate"
              >
                {pageTitle}
              </motion.h1>
            </div>
          </div>

          {/* Right Side: Status & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex flex-col items-end">
             
              <span className="text-[9px] font-bold text-success flex items-center gap-1.5 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                System Online
              </span>
            </div>

            {/* Avatar - Using your Theme primary and accent colors */}
            <div className="h-9 w-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary dark:text-accent font-black shadow-inner">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
