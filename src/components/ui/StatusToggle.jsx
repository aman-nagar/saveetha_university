import React from "react";

/**
 * Reusable Status Toggle Component
 * @param {number|boolean} status - Current status (1/0 or true/false)
 * @param {function} onToggle - Function to call when clicked
 * @param {boolean} loading - Disable interaction during API calls
 */
export default function StatusToggle({ status, onToggle, loading = false }) {
  const isActive = status == 1;

  return (
    <div
      className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 
        ${loading ? "opacity-50 cursor-wait" : "cursor-pointer hover:bg-bg group"}`}
      title={isActive ? "Mark as Inactive" : "Mark as Active"}
      onClick={(e) => {
        e.stopPropagation(); // Prevent table row clicks
        if (!loading) onToggle();
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Hover Effect Ring */}
        <span
          className={`absolute w-6 h-6 rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${
            isActive ? "bg-success" : "bg-muted"
          }`}
        />

        {/* Status Dot */}
        <span
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ring-2 ring-offset-2 ${
            isActive
              ? "bg-success ring-success/30 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
              : "bg-muted ring-muted/30"
          } ${loading ? "animate-pulse" : ""}`}
        />
      </div>
    </div>
  );
}
