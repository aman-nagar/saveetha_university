import { FaChevronRight, FaThumbtack } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SidebarHeader({
  isCollapsed,
  isPinned,
  togglePin,
  toggleCollapse,
}) {
  return (
    <div className="p-2 border-b border-white/10">
      <div className="flex items-center justify-between">
        {isCollapsed ? (
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors w-full flex items-center justify-center group relative"
          >
            <span className="text-xl flex items-center justify-center w-6 text-accent">
              🏛️
            </span>
            <div className="fixed left-14 hidden md:block bg-primary text-white text-sm py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 whitespace-nowrap border border-white/10">
              Expand Sidebar
            </div>
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Link
              to="/admin"
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-xl flex items-center justify-center w-6 text-accent">
                🏛️
              </span>
              <span className="text-sm font-bold text-white whitespace-nowrap">
                Admin Panel
              </span>
            </Link>
            <div className="flex items-center space-x-1">
              <button
                onClick={togglePin}
                className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                  isPinned ? "text-accent" : "text-white/40"
                }`}
                title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                <FaThumbtack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
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
