// src/components/sidebar/SidebarFooter.jsx
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function SidebarFooter({ isCollapsed }) {
  const { user, studentData, logout, loading } = useAuth();

  if (loading)
    return <div className="p-4 text-white/20 text-xs">Loading...</div>;

  // Determine if user is student or admin
  const isStudent = user?.role === "student";
  const isCenter = user?.role === "center";
  // const displayName = isStudent ? studentData?.candidate_name : user?.name;
  let displayName = user?.name;
  // const displaySubtext = isStudent ? studentData?.enrollment_no : user?.email;
  let displaySubtext = user?.email;
  let firstLetter = user?.name?.charAt(0);

  if (isStudent) {
    displayName = studentData?.candidate_name;
    displaySubtext = studentData?.email;
    firstLetter = studentData?.candidate_name?.charAt(0);
  } else if (isCenter) {
    displayName = user?.institute_owner_name || "Center Owner";
    displaySubtext = user?.email;
    firstLetter = displayName?.charAt(0);
  }

  if (!user && !studentData) return null;

  return (
    <div className="p-2 border-t border-white/10">
      <div className="flex items-center justify-center">
        {isCollapsed ? (
          <div className="group relative w-full flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-xs text-white font-bold">
                {firstLetter || "U"}
              </span>
            </div>

            <Button onClick={logout} title="Logout">
              <FaSignOutAlt className="w-4 h-4" />
            </Button>

            {/* Tooltip */}
            <div className="fixed left-14 hidden md:block bg-surface text-white text-xs py-1.5 px-3 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] whitespace-nowrap border border-border">
              {displayName || "User"} (Logout)
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                <span className="text-sm text-white font-bold">
                  {firstLetter || "U"}
                </span>
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-white truncate max-w-[100px]">
                  {displayName || "User"}
                </p>
                <p className="text-[10px] text-white/50 truncate max-w-[100px]">
                  {displaySubtext ||
                    (isStudent
                      ? "Student"
                      : isCenter
                        ? "Center"
                        : "Administrator")}
                </p>
              </div>
            </div>

            <Button onClick={logout} title="Sign Out">
              <FaSignOutAlt className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
