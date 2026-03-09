// src/layouts/StudentLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export default function StudentLayout() {
  const [theme, setTheme] = useState(
    localStorage.getItem("adminTheme") || "light",
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("adminTheme", newTheme);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
      style={{ backgroundColor: theme === "dark" ? "#0b1220" : "#f8fafc" }}
    >
      <div className="flex flex-1" style={{ backgroundColor: theme === "dark" ? "#0b1220" : "#f8fafc" }}>
        {/* We reuse the sidebar! It will automatically filter for "student" role */}
        <Sidebar theme={theme} toggleTheme={toggleTheme} />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="w-full flex-1 p-4 md:p-8 overflow-x-hidden" style={{ backgroundColor: theme === "dark" ? "#0b1220" : "#f8fafc" }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
