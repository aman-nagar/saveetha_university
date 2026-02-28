// src/layouts/CenterLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/sidebar/role/AdminSidebar";

export default function CenterLayout() {
  const [theme, setTheme] = useState(
    localStorage.getItem("centerTheme") || "light",
  );

  useEffect(() => {
    localStorage.setItem("centerTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="flex flex-1 bg-bg text-text">
        {/* The sidebar will now automatically show only "Center" links */}
        <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-2 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
