// src/pages/center/SubCenterDashboardPage.jsx
import React from "react";
import CenterStatsCard from "../../components/center/CenterStatsCard";

export default function SubCenterDashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Center Dashboard
        </h1>
        <p className="text-muted mt-1">Welcome back, Center Name</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CenterStatsCard
          title="Total Sub-centers"
          value="12"
          icon="building"
          color="blue"
        />
        <CenterStatsCard
          title="Active Students"
          value="348"
          icon="users"
          color="green"
        />
        <CenterStatsCard
          title="Pending Admissions"
          value="19"
          icon="clock"
          color="yellow"
        />
        <CenterStatsCard
          title="Revenue This Month"
          value="₹4.2L"
          icon="rupee"
          color="purple"
        />
      </div>

      {/* Optional: Recent Activity / Notices */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted">No recent activity to show.</p>
      </div>
    </div>
  );
}
