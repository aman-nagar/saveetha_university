// src/pages/admin/AdminDashboard.jsx
import React from "react";
import {
  HiUserGroup,
  HiOfficeBuilding,
  HiDocumentText,
  HiClipboardList,
} from "react-icons/hi";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: 7,
      icon: HiUserGroup,
    },
    {
      title: "Total Centers",
      value: 20,
      icon: HiOfficeBuilding,
    },
    {
      title: "Certificates Issued",
      value: 0,
      icon: HiDocumentText,
    },
    {
      title: "Results Issued",
      value: 5,
      icon: HiClipboardList,
    },
  ];

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-primary">
          Dashboard
        </h1>
        <p className="text-muted mt-1">Overview of system statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="bg-surface border border-border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">{item.title}</p>
                  <h2 className="text-2xl font-heading font-bold text-primary mt-1">
                    {item.value}
                  </h2>
                </div>

                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="text-primary text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
