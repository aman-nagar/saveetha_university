import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const SidebarMenuItem = ({
  menu,
  isActive,
  isExpanded,
  onToggle,
  isCollapsed,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isExpanded && menuRef.current) {
      menuRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isExpanded]);
  const Icon = menu.icon;
  return (
    <div ref={menuRef} className="mb-1 group">
      {/* Parent button */}
      <button
        onClick={() => onToggle(menu.id)}
        className={`w-full flex items-center px-2 py-2 rounded-lg transition-colors duration-200 ${
          isExpanded
            ? "bg-accent/10 text-accent"
            : "hover:bg-white/10 text-white/80"
        }`}
      >
        {/* Icon */}
        <span
          className={`text-lg ${
            isCollapsed ? "" : "mr-2"
          } flex items-center justify-center w-6`}
        >
          <Icon />
        </span>

        {/* Label + arrow */}
        <div
          className={`flex-1 flex items-center justify-between transition-opacity duration-200 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          <span className="font-medium text-left text-sm whitespace-nowrap text-white">
            {menu.label}
          </span>

          <FaChevronDown
            className={`w-3 h-3 transform transition-transform duration-200 ml-2 ${
              isExpanded ? "rotate-180" : ""
            } text-white/60`}
          />
        </div>

        {/* Tooltip when collapsed */}
        {isCollapsed && (
          <div className="fixed left-14 hidden md:block bg-primary text-white text-sm py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 whitespace-nowrap border border-white/10">
            {menu.label}
          </div>
        )}
      </button>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="ml-3 mt-1 overflow-hidden"
          >
            <div className="py-1 max-h-[300px] overflow-y-auto scrollbar-none">
              {menu.children.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className={`
                    block px-3 py-1.5 rounded-md text-xs transition-colors duration-200 group relative
                    ${
                      isActive(child.path)
                        ? "bg-accent/20 text-accent"
                        : "text-white/70 hover:text-accent hover:bg-white/5"
                    }
                  `}
                >
                  {!isCollapsed && child.label}

                  {/* Tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="fixed left-14 hidden md:block bg-primary text-white text-sm py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 whitespace-nowrap border border-white/10">
                      {child.label}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
