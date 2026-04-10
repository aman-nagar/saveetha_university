// src/components/admin/sidebar/SidebarHeader.jsx
import { Link } from "react-router-dom";
import { FaThumbtack, FaChevronRight, FaSun, FaMoon } from "react-icons/fa";
import logo2 from "../../assets/images/logo2.png";
import { usePublicContent } from "../../hooks/usePublicContent";
import { useAuth } from "../../context/AuthContext";

export default function SidebarHeader({
  isCollapsed,
  isPinned,
  togglePin,
  toggleCollapse,
  theme,
  toggleTheme,
}) {
  const { siteDetails } = usePublicContent();
  const { user } = useAuth();

  const isCenter = user?.role === "center";
  const displayLogo =
    isCenter && user?.owner_image
      ? user.owner_image
      : siteDetails?.additional_logo || logo2;

  return (
    <div className="p-2 border-b border-white/10">
      <div className="flex items-center justify-between">
        {isCollapsed ? (
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors w-full flex items-center justify-center group relative"
          >
            <img
              src={displayLogo}
              className="h-8 w-auto rounded-xl"
              alt="Logo"
            />
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Link
              to="/admin"
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <img
                src={displayLogo}
                className="h-8 w-auto rounded-xl"
                alt="Logo"
              />
              <span className="text-sm font-bold text-white whitespace-nowrap">
                S.A. University
              </span>
            </Link>

            <div className="flex items-center space-x-1">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-accent cursor-pointer"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun className="w-3.5 h-3.5" />
                ) : (
                  <FaMoon className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Pin toggle */}
              <button
                onClick={togglePin}
                className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                  isPinned ? "text-accent" : "text-white/40"
                }`}
                title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                <FaThumbtack className="w-3.5 h-3.5" />
              </button>

              {/* Collapse toggle */}
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
                title="Collapse sidebar"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
