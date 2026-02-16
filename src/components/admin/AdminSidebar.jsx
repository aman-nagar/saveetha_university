// src/components/admin/AdminSidebar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaChevronDown,
  FaSearch,
  FaThumbtack,
  FaChevronRight,
  FaHome,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Dummy menu items for university admin
const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <FaHome />,
    children: [{ label: "Overview", path: "/admin" }],
  },
  {
    id: 2,
    label: "Students",
    icon: <FaUserGraduate />,
    children: [
      { label: "All Students", path: "/admin/students" },
      { label: "Add New", path: "/admin/students/add" },
      { label: "Admissions", path: "/admin/admissions" },
      { label: "Attendance", path: "/admin/attendance" },
    ],
  },
  {
    id: 3,
    label: "Academics",
    icon: <FaBook />,
    children: [
      { label: "Courses", path: "/admin/courses" },
      { label: "Programs", path: "/admin/programs" },
      { label: "Faculty", path: "/admin/faculty" },
      { label: "Timetable", path: "/admin/timetable" },
    ],
  },
  {
    id: 4,
    label: "Examinations",
    icon: <FaClipboardList />,
    children: [
      { label: "Results", path: "/admin/results" },
      { label: "Schedule", path: "/admin/exam-schedule" },
      { label: "Hall Tickets", path: "/admin/hall-tickets" },
    ],
  },
  {
    id: 5,
    label: "Events",
    icon: <FaCalendarAlt />,
    children: [
      { label: "Calendar", path: "/admin/calendar" },
      { label: "Add Event", path: "/admin/events/add" },
    ],
  },
  {
    id: 6,
    label: "Communications",
    icon: <FaEnvelope />,
    children: [
      { label: "Notifications", path: "/admin/notifications" },
      { label: "Announcements", path: "/admin/announcements" },
    ],
  },
  {
    id: 7,
    label: "Reports",
    icon: <FaChartBar />,
    children: [
      { label: "Analytics", path: "/admin/analytics" },
      { label: "Generate Reports", path: "/admin/reports" },
    ],
  },
  {
    id: 8,
    label: "Settings",
    icon: <FaCog />,
    children: [
      { label: "General", path: "/admin/settings" },
      { label: "Users", path: "/admin/users" },
      { label: "Permissions", path: "/admin/permissions" },
    ],
  },
];

const MenuItem = ({ menu, isActive, isExpanded, onToggle, isCollapsed }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isExpanded && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isExpanded]);

  return (
    <div ref={menuRef} className="mb-1 group">
      <button
        onClick={() => onToggle(menu.id)}
        className={`w-full flex items-center px-2 py-2 rounded-lg transition-colors duration-200 ${
          isExpanded
            ? "bg-accent/10 text-accent"
            : "hover:bg-white/10 text-white/80"
        }`}
      >
        <span
          className={`text-lg ${isCollapsed ? "" : "mr-2"} flex items-center justify-center w-6`}
        >
          {menu.icon}
        </span>
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
        {isCollapsed && (
          <div className="fixed left-14 hidden md:block bg-primary text-white text-sm py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 whitespace-nowrap border border-white/10">
            {menu.label}
          </div>
        )}
      </button>

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

export const AdminSidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("adminSidebarCollapsed");
    return stored ? JSON.parse(stored) : false;
  });
  const [isPinned, setIsPinned] = useState(() => {
    const stored = localStorage.getItem("adminSidebarPinned");
    return stored ? JSON.parse(stored) : true;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("adminSidebarCollapsed", JSON.stringify(isCollapsed));
    localStorage.setItem("adminSidebarPinned", JSON.stringify(isPinned));
  }, [isCollapsed, isPinned]);

  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenus([]);
    }
  }, [isCollapsed]);

  const toggleMenu = (menuId) => {
    if (isCollapsed && !isPinned) {
      setIsCollapsed(false);
      setTimeout(() => {
        setExpandedMenus([menuId]);
      }, 150);
    } else {
      setExpandedMenus((prev) =>
        prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [menuId]
      );
    }
  };

  const isActive = (path) => location.pathname === path;

  const filteredMenuItems = menuItems.filter(
    (menu) =>
      menu.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.children.some((child) =>
        child.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsCollapsed(true);
      setExpandedMenus([]);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  const toggleCollapse = () => {
    if (isPinned) {
      setIsCollapsed(!isCollapsed);
      if (!isCollapsed) {
        setExpandedMenus([]);
      }
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`h-screen bg-primary flex flex-col hidden md:flex ${
        isCollapsed ? "w-14" : "w-64"
      } transition-[width] duration-200 ease-in-out sticky top-0`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden" }}
    >
      {/* Header */}
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

      {/* Search */}
      <div
        className={`overflow-hidden transition-[height] duration-200 ease-in-out ${
          isCollapsed ? "h-0" : "h-auto"
        }`}
      >
        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
            />
            <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden py-2 px-2">
        <div className="h-full overflow-y-auto scrollbar-none">
          {filteredMenuItems.map((menu) => (
            <MenuItem
              key={menu.id}
              menu={menu}
              isActive={isActive}
              isExpanded={expandedMenus.includes(menu.id)}
              onToggle={toggleMenu}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
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
              <div className="flex space-x-1">
                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors relative">
                  <FaBell className="w-3.5 h-3.5 text-white/60 hover:text-accent" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <FaCog className="w-3.5 h-3.5 text-white/60 hover:text-accent" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};