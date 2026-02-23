// src/layouts/CenterLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader"; // reuse for now
import { AdminSidebar } from "../components/admin/sidebar/role/AdminSidebar"; // we'll restrict menu later

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
        <AdminSidebar theme={theme} toggleTheme={toggleTheme} />{" "}
        {/* ← later replace with CenterSidebar */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader /> {/* ← later replace with CenterHeader if needed */}
          <main className="flex-1 items-center justify-center p-2 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
