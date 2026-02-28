import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

export default function SidebarFooter({ isCollapsed }) {
  // Use a safety check to avoid the "null" destructuring error
  const auth = useAuth();

  if (!auth) return null; // Guard against null context

  const { user, logout } = auth;

  return (
    <div className="p-2 border-t border-white/10">
      <div className="flex items-center justify-center">
        {isCollapsed ? (
          <div className="group relative w-full flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-xs text-white font-bold">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <FaSignOutAlt className="w-4 h-4" />
            </button>

            {/* Tooltip */}
            <div className="fixed left-14 hidden md:block bg-surface text-white text-xs py-1.5 px-3 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] whitespace-nowrap border border-border">
              {user?.name || "Admin"} (Logout)
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                <span className="text-sm text-white font-bold">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-white truncate max-w-[100px]">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-[10px] text-white/50 truncate max-w-[100px]">
                  {user?.email || "admin@system.com"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="group p-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-300"
              title="Sign Out"
            >
              <FaSignOutAlt className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
