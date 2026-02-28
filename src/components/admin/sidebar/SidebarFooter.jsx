import { FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

export default function SidebarFooter({ isCollapsed }) {
  const { user, logout } = useAuth();
  return (
    <div className="p-2 border-t border-white/10">
      <div className="flex items-center justify-center">
        {isCollapsed ? (
          <div className="group relative w-full flex justify-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-xs text-white">👤</span>
            </div>
            <div className="fixed left-14 hidden md:block bg-primary text-white text-sm py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap border border-white/10">
              Admin User
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-xs text-white">👤</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white">Admin User</p>
                <p className="text-xs text-white/60">admin@univ.edu</p>
              </div>
            </div>
            {/* <div className="flex space-x-1">
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors relative">
                <FaBell className="w-3.5 h-3.5 text-white/60 hover:text-accent" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <FaCog className="w-3.5 h-3.5 text-white/60 hover:text-accent" />
              </button>
            </div> */}
            <button
              onClick={logout}
              className="group p-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-300"
              title="Sign Out"
            >
              <FaSignOutAlt className="w-3.5 h-3.5 text-white/40 group-hover:text-red-500 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
