// src/pages/center/CenterDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  HiUsers,
  HiUserRemove,
  HiIdentification,
  HiAcademicCap,
} from "react-icons/hi";
import CenterStatsCard from "../../components/center/CenterStatsCard";
import { fetchCenterDashboard } from "../../api/center/centerApi";
import LoadingFallback from "../../components/ui/LoadingFallback";

export default function CenterDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenterDashboard()
      .then((res) => {
        if (res.success) setStats(res.data);
      })
      .catch((err) => console.error("Dashboard Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingFallback variant="dashboard" />;

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-bg min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-extrabold text-primary tracking-tight">
          WIEP Overview
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <p className="text-muted font-medium text-sm">
            System Live: Dashboard Analytics
          </p>
        </div>
      </div>

      {/* Stats Grid - Mapping API Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CenterStatsCard
          title="Total Students"
          value={stats?.total_students || 0}
          icon={HiUsers}
          colorClass="text-primary bg-primary/10"
        />
        <CenterStatsCard
          title="Inactive Students"
          value={stats?.inactive_students || 0}
          icon={HiUserRemove}
          colorClass="text-secondary bg-secondary/10"
        />
        <CenterStatsCard
          title="Admit Cards"
          value={stats?.total_admit_cards || 0}
          icon={HiIdentification}
          colorClass="text-warning bg-warning/10"
        />
        <CenterStatsCard
          title="Total Results"
          value={stats?.total_results || 0}
          icon={HiAcademicCap}
          colorClass="text-success bg-success/10"
        />
      </div>
    </div>
  );
}
