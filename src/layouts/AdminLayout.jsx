// src/layouts/AdminLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/sidebar/AdminSidebar";

export default function AdminLayout() {
  const [theme, setTheme] = useState(
    localStorage.getItem("adminTheme") || "light",
  );

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("adminTheme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="flex flex-1 bg-bg text-text">
        <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="p-6 flex-1 overflow-x-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
