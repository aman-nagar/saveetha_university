// src/components/admin/sidebar/role/AdminSidebar.jsx
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "../menuItems";
import { SidebarMenuItem } from "../SidebarMenuItem";
import SidebarHeader from "../SidebarHeader";
import SidebarSearch from "../SidebarSearch";
import SidebarFooter from "../SidebarFooter";
import MobileNavDrawer from "../MobileNavDrawer";
import { useAuth } from "../../../../context/AuthContext";

export const AdminSidebar = ({ theme, toggleTheme }) => {
  const { user } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Load collapsed state from localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("adminSidebarCollapsed");
    return stored ? JSON.parse(stored) : false;
  });

  // Load pinned state from localStorage
  const [isPinned, setIsPinned] = useState(() => {
    const stored = localStorage.getItem("adminSidebarPinned");
    return stored ? JSON.parse(stored) : true;
  });

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("adminSidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("adminSidebarPinned", JSON.stringify(isPinned));
  }, [isPinned]);

  // If collapsed, close all menus
  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenus([]);
    }
  }, [isCollapsed]);

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [menuId],
    );
  };

  const filteredMenuItems = menuItems
    .filter((menu) => menu.roles.includes(user?.role))
    .map((menu) => ({
      ...menu,
      children: menu.children.filter((child) => {
        const roleMatch = !child.roles || child.roles.includes(user?.role);
        // ✅ NEW: Check the condition if it exists
        const conditionMatch = !child.condition || child.condition(user);

        return roleMatch && conditionMatch;
      }),
    }))
    .filter((menu) => menu.children.length > 0);

  // Hover logic
  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsCollapsed(true);
    }
  };

  // Pin toggle logic
  const togglePin = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);

    if (newPinned) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };

  // Manual collapse button (only when pinned)
  const toggleCollapse = () => {
    if (isPinned) {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, visible on md+ */}
      <div
        ref={sidebarRef}
        className={`h-screen bg-primary flex-col hidden md:flex ${
          isCollapsed ? "w-14" : "w-64"
        } transition-[width] duration-200 ease-in-out sticky top-0`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: "hidden" }}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          isPinned={isPinned}
          togglePin={togglePin}
          toggleCollapse={toggleCollapse}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <SidebarSearch
          isCollapsed={isCollapsed}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <nav className="flex-1 overflow-hidden py-2 px-2">
          <div className="h-full overflow-y-auto scrollbar-none">
            {filteredMenuItems.map((menu) => (
              <SidebarMenuItem
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

        <SidebarFooter isCollapsed={isCollapsed} />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        menuItems={filteredMenuItems}
        isActive={isActive}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Mobile Hamburger Button - Visible only on mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-2 left-2 z-40 p-2 rounded-lg bg-transparent text-primary shadow-lg border border-white/20"
        aria-label="Open menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
};
