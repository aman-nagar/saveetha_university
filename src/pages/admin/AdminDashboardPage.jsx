import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiUserGroup,
  HiOfficeBuilding,
  HiDocumentText,
  HiClipboardList,
  HiPhotograph,
  HiChevronRight,
  HiCheckCircle,
  HiUserAdd,
} from "react-icons/hi";
import { fetchAdminDashboard } from "../../api/dashboard/dashboardApi";

export default function AdminDashboard() {
  const [data, setData] = useState({
    all_students: 0,
    active_students: 0,
    total_results: 0,
    total_admit_cards: 0,
    total_centers: 0,
    total_courses: 0,
    total_gallery_images: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchAdminDashboard();
        setData(response || {});
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  // --- Calculations ---
  const inactiveStudents = Math.max(
    0,
    data.all_students - data.active_students,
  );
  const activePct =
    data.all_students > 0
      ? Math.round((data.active_students / data.all_students) * 100)
      : 0;
  const inactivePct =
    data.all_students > 0
      ? Math.round((inactiveStudents / data.all_students) * 100)
      : 0;

  // --- Top Row Stats ---
  const topStats = [
    {
      title: "Total Centers",
      value: data.total_centers,
      icon: HiOfficeBuilding,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      title: "Total Courses",
      value: data.total_courses,
      icon: HiDocumentText,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
    {
      title: "Admit Cards",
      value: data.total_admit_cards,
      icon: HiClipboardList,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/20",
    },
    {
      title: "Results Published",
      value: data.total_results,
      icon: HiCheckCircle,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-60px)] w-full bg-bg text-text p-4 md:p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted">
              Overview of university operations and data.
            </p>
          </div>
        </div>

        {/* ── TOP STATS GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {topStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                {loading ? (
                  <div className="h-8 w-16 bg-border/50 animate-pulse rounded mb-1"></div>
                ) : (
                  <h2 className="text-2xl md:text-3xl font-black leading-none">
                    {stat.value}
                  </h2>
                )}
                <p className="text-xs md:text-sm font-medium text-muted mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* 1. STUDENT ANALYTICS (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <HiUserGroup className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg">
                  Student Enrollment
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-border rounded-full text-muted uppercase tracking-wider">
                Analytics
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Total Big Number */}
              <div className="text-center md:text-left shrink-0">
                <p className="text-sm font-medium text-muted mb-1">
                  Total Registered
                </p>
                {loading ? (
                  <div className="h-12 w-24 bg-border/50 animate-pulse rounded mx-auto md:mx-0"></div>
                ) : (
                  <h2 className="text-5xl lg:text-6xl font-black text-text">
                    {data.all_students}
                  </h2>
                )}
              </div>

              {/* Progress Bar & Breakdown */}
              <div className="flex-1 w-full space-y-4">
                {/* Visual Bar */}
                <div className="h-4 w-full bg-border rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-success transition-all duration-1000"
                    style={{ width: `${activePct}%` }}
                    title="Active"
                  />
                  <div
                    className="h-full bg-warning transition-all duration-1000"
                    style={{ width: `${inactivePct}%` }}
                    title="Pending/Inactive"
                  />
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/5 border border-success/20 rounded-xl p-3">
                    <p className="text-xs text-success font-bold uppercase tracking-wide">
                      Active
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black">
                        {loading ? "-" : data.active_students}
                      </span>
                      <span className="text-xs text-muted mb-1 pb-0.5">
                        ({activePct}%)
                      </span>
                    </div>
                  </div>
                  <div className="bg-warning/5 border border-warning/20 rounded-xl p-3">
                    <p className="text-xs text-warning font-bold uppercase tracking-wide">
                      Pending / Inactive
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black">
                        {loading ? "-" : inactiveStudents}
                      </span>
                      <span className="text-xs text-muted mb-1 pb-0.5">
                        ({inactivePct}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. MEDIA & QUICK ACTIONS (Spans 1 column) */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Gallery Stats Widget */}
            <div className="bg-surface border border-border rounded-3xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
                <HiPhotograph className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">
                  Gallery Media
                </p>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="h-8 w-10 bg-border/50 animate-pulse rounded"></div>
                  ) : (
                    <h3 className="text-3xl font-black leading-none">
                      {data.total_gallery_images}
                    </h3>
                  )}
                  <span className="text-sm font-medium text-muted">Images</span>
                </div>
              </div>
            </div>

            {/* Quick Launch Menu */}
            <div className="flex-1 bg-primary text-white rounded-3xl p-5 shadow-lg border border-primary flex flex-col">
              <h3 className="font-heading font-bold text-sm mb-4 opacity-90 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-2 flex-1">
                <Link
                  to="/admin/students/add"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <HiUserAdd className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-semibold">
                      Add New Student
                    </span>
                  </div>
                  <HiChevronRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/admin/centers/add"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <HiOfficeBuilding className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-semibold">
                      Register Center
                    </span>
                  </div>
                  <HiChevronRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/admin/results/create"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <HiCheckCircle className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-semibold">
                      Publish Result
                    </span>
                  </div>
                  <HiChevronRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
