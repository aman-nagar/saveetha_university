import React from "react";
import {
  HiUserGroup,
  HiOfficeBuilding,
  HiDocumentText,
  HiClipboardList,
  HiTrendingUp,
  HiLightningBolt,
  HiChevronRight,
  HiCheckCircle,
} from "react-icons/hi";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Students",
      value: 7,
      sub: "+2 new",
      icon: HiUserGroup,
      trend: "57% Appr.",
      color: "primary",
    },
    {
      title: "Centers",
      value: 20,
      sub: "Active",
      icon: HiOfficeBuilding,
      trend: "100%",
      color: "secondary",
    },
    {
      title: "Certificates",
      value: 0,
      sub: "Pending",
      icon: HiDocumentText,
      trend: "0%",
      color: "accent",
    },
    {
      title: "Results",
      value: 5,
      sub: "71% Success",
      icon: HiClipboardList,
      trend: "Sync",
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen lg:h-screen w-full bg-bg text-text p-3 sm:p-6 overflow-x-hidden flex flex-col">
      {/* ── HEADER ── */}
      <header className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-xl sm:text-3xl font-heading font-black tracking-tight text-primary dark:text-text leading-none">
            System <span className="text-accent italic">Intel</span>
          </h1>
          <p className="text-muted text-[10px] sm:text-sm font-medium mt-1">
            Institutional oversight
          </p>
        </div>
        <button className="bg-primary text-white p-2 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-sm font-bold shadow-lg shadow-primary/20">
          <span className="hidden sm:inline">Generate Report</span>
          <HiTrendingUp className="sm:hidden text-lg" />
        </button>
      </header>

      {/* ── MAIN GRID ── */}
      {/* Mobile: 1 column | Tablet: 2 columns | Desktop: Bento Grid (4 cols, 4 rows) */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-3 sm:gap-4 overflow-y-auto lg:overflow-hidden no-scrollbar pb-20 lg:pb-0">
        {/* Top Row: Mini Stats */}
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 flex flex-row sm:flex-col justify-between items-center sm:items-start group transition-all shadow-sm"
          >
            <div
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-${item.color}/10 text-${item.color} shrink-0`}
            >
              <item.icon size={20} className="sm:size-6" />
            </div>
            <div className="flex-1 ml-4 sm:ml-0 sm:mt-2 text-right sm:text-left">
              <div className="flex sm:flex-col justify-end sm:justify-start items-center sm:items-start gap-2 sm:gap-0">
                <h2 className="text-xl sm:text-3xl font-black leading-none">
                  {item.value}
                </h2>
                <p className="text-[10px] sm:text-sm font-bold text-text/80">
                  {item.title}
                </p>
              </div>
              <p className="hidden sm:block text-[9px] text-muted mt-1 uppercase tracking-widest">
                {item.trend}
              </p>
            </div>
          </div>
        ))}

        {/* Center: Analytics (Spans 3 cols on desktop) */}
        <div className="lg:col-span-3 lg:row-span-2 bg-surface border border-border rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-6 flex flex-col min-h-[300px] lg:min-h-0">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="font-heading font-bold text-sm sm:text-lg flex items-center gap-2">
              <HiTrendingUp className="text-success" /> Enrollment Velocity
            </h3>
            <span className="text-[10px] font-black text-muted uppercase">
              Live Updates
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Visual Bar Chart */}
            <div className="flex items-end gap-1.5 sm:gap-2 h-24 sm:h-32 mb-6">
              {[40, 70, 45, 90, 65, 80, 57].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/10 rounded-t-lg sm:rounded-t-xl relative group"
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg sm:rounded-t-xl transition-all duration-700 ${i === 6 ? "bg-accent" : "bg-primary"}`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            {/* Status Boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 sm:p-4 rounded-2xl bg-success/5 border border-success/10">
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-success tracking-widest">
                  Approved
                </p>
                <p className="text-lg sm:text-2xl font-black text-text">04</p>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-warning/5 border border-warning/10">
                <p className="text-[8px] sm:text-[10px] uppercase font-black text-warning tracking-widest">
                  Pending
                </p>
                <p className="text-lg sm:text-2xl font-black text-text">03</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions (Pinned right on desktop, grid item on mobile) */}
        <div className="lg:row-span-2 bg-primary dark:bg-surface text-white dark:text-text rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-6 flex flex-col shadow-xl">
          <h3 className="font-heading font-bold text-sm mb-4">Quick Launch</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 flex-1">
            {["Gallery", "Students", "ID Cards", "Exams"].map((action, idx) => (
              <button
                key={idx}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-bg dark:hover:bg-primary/20 border border-white/5 flex items-center justify-between group transition-all"
              >
                <span className="text-[10px] sm:text-xs font-bold">
                  {action}
                </span>
                <HiChevronRight className="hidden sm:block group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-accent text-primary flex items-center gap-2">
            <HiLightningBolt />
            <span className="text-[10px] font-black uppercase tracking-tight">
              System Online
            </span>
          </div>
        </div>

        {/* Bottom Bar: Activity (Scrollable on mobile) */}
        <div className="lg:col-span-4 bg-surface border border-border rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-1">
            {[
              { label: "New Student", time: "2m", color: "success" },
              { label: "Cert. Issued", time: "1h", color: "accent" },
              { label: "Center Audit", time: "3h", color: "secondary" },
              { label: "Result Pub", time: "5h", color: "primary" },
            ].map((log, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center gap-3 pr-4 border-r border-border last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-${log.color}/20 flex items-center justify-center text-${log.color}`}
                >
                  <HiCheckCircle size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold leading-none">
                    {log.label}
                  </p>
                  <p className="text-[8px] text-muted">{log.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
