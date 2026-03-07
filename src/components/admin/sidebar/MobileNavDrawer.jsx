// src/components/admin/sidebar/MobileNavDrawer.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaSun,
  FaMoon,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import logo2 from "../../../assets/images/logo2.png";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";

export default function MobileNavDrawer({
  isOpen,
  onClose,
  menuItems,
  isActive,
  theme,
  toggleTheme,
}) {
  const { user, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState([]);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[280px] bg-transparent z-50 md:hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link
                to="/admin"
                className="flex items-center space-x-3"
                onClick={onClose}
              >
                <img src={logo2} className="h-8 w-auto rounded-xl" alt="Logo" />
                <span className="text-base font-bold text-white">
                  S.A. University
                </span>
              </Link>

              <div className="flex items-center space-x-2">
                <Button onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === "dark" ? (
                    <FaSun className="w-4 h-4" />
                  ) : (
                    <FaMoon className="w-4 h-4" />
                  )}
                </Button>
                <button onClick={onClose} aria-label="Close menu">
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-1">
                {menuItems.map((menu) => {
                  const Icon = menu.icon;
                  const isExpanded = expandedMenus.includes(menu.id);
                  const hasActiveChild = menu.children.some((child) =>
                    isActive(child.path),
                  );

                  return (
                    <div key={menu.id} className="mb-1">
                      <button
                        onClick={() => toggleMenu(menu.id)}
                        className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                          isExpanded || hasActiveChild
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-white/10 text-white/90"
                        }`}
                      >
                        <span className="text-lg mr-3 flex items-center justify-center w-6">
                          <Icon />
                        </span>
                        <span className="flex-1 text-left text-sm font-medium">
                          {menu.label}
                        </span>
                        <FaChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          } text-white/60`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-9 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
                              {menu.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  onClick={onClose}
                                  className={`block px-3 py-2.5 rounded-md text-sm transition-colors ${
                                    isActive(child.path)
                                      ? "bg-accent/20 text-accent font-medium"
                                      : "text-white/70 hover:text-accent hover:bg-white/5"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {user?.email || "admin@univ.edu"}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-3 rounded-xl bg-danger/5 hover:bg-red-500/10 border border-red-600 hover:border-red-500/30 transition-all duration-300"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="w-4 h-4 text-white/40 hover:text-red-500 " />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
