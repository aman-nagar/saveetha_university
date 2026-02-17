import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "./menuItems";
import { SidebarMenuItem } from "./SidebarMenuItem";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarFooter from "./SidebarFooter";

export const AdminSidebar = () => {
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

  const isActive = (path) => location.pathname === path;

  const filteredMenuItems = menuItems.filter(
    (menu) =>
      menu.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.children.some((child) =>
        child.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  // Hover logic
  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

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
      // If pinned, sidebar should stay open
      setIsCollapsed(false);
    } else {
      // If unpinned, sidebar should collapse
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
    <div
      ref={sidebarRef}
      className={`h-screen bg-primary flex flex-col hidden md:flex ${
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
  );
};
