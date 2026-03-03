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
    { title: "Students", value: 7, sub: "+2 new", icon: HiUserGroup, trend: "57% Appr.", color: "primary" },
    { title: "Centers", value: 20, sub: "Active", icon: HiOfficeBuilding, trend: "100%", color: "secondary" },
    { title: "Certificates", value: 0, sub: "Pending", icon: HiDocumentText, trend: "0%", color: "accent" },
    { title: "Results", value: 5, sub: "71% Success", icon: HiClipboardList, trend: "Sync", color: "primary" },
  ];

  return (
    <div className="h-[screen-60px] w-full bg-bg text-text p-3 overflow-hidden flex flex-col">
      {/* ── MAIN BENTO GRID ── */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-3 lg:max-h-full min-h-0">
        
        {/* Row 1: Mini Stats (Strictly 1 row high) */}
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl p-4 flex flex-row lg:flex-col justify-between items-center lg:items-start min-h-0 shadow-sm overflow-hidden"
          >
            <div className={`p-2 rounded-xl bg-${item.color}/10 text-${item.color} shrink-0`}>
              <item.icon className="size-5 lg:size-6" />
            </div>
            <div className="flex-1 ml-4 lg:ml-0 lg:mt-1 text-right lg:text-left truncate">
              <h2 className="text-xl lg:text-2xl font-black leading-none">{item.value}</h2>
              <p className="text-[10px] lg:text-xs font-bold text-muted truncate">{item.title}</p>
            </div>
          </div>
        ))}

        {/* Row 2-3: Center Analytics (Spans 3 cols, 2 rows) */}
        <div className="lg:col-span-3 lg:row-span-2 bg-surface border border-border rounded-3xl p-4 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-2 shrink-0">
            <h3 className="font-heading font-bold text-xs lg:text-sm flex items-center gap-2">
              <HiTrendingUp className="text-success" /> Enrollment Velocity
            </h3>
            <span className="text-[9px] font-black text-muted uppercase">Live</span>
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Visual Bar Chart - Height controlled by flex-1 */}
            <div className="flex items-end gap-1.5 h-full max-h-32 mb-4 min-h-0">
              {[40, 70, 45, 90, 65, 80, 57].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 rounded-t-lg relative group h-full">
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-700 ${i === 6 ? "bg-accent" : "bg-primary"}`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            {/* Status Boxes */}
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <div className="p-2 lg:p-3 rounded-xl bg-success/5 border border-success/10 text-center">
                <p className="text-[8px] lg:text-[10px] uppercase font-black text-success">Approved</p>
                <p className="text-lg lg:text-xl font-black">04</p>
              </div>
              <div className="p-2 lg:p-3 rounded-xl bg-warning/5 border border-warning/10 text-center">
                <p className="text-[8px] lg:text-[10px] uppercase font-black text-warning">Pending</p>
                <p className="text-lg lg:text-xl font-black">03</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2-3 Side: Quick Launch (Spans 1 col, 2 rows) */}
        <div className="lg:row-span-2 bg-primary dark:bg-surface text-white dark:text-text rounded-3xl p-4 flex flex-col min-h-0 shadow-xl border border-white/5">
          <h3 className="font-heading font-bold text-xs mb-3 shrink-0">Quick Launch</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 flex-1 min-h-0 overflow-hidden">
            {["Gallery", "Students", "ID Cards", "Exams"].map((action, idx) => (
              <button
                key={idx}
                className="p-2 lg:p-3 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-bg dark:hover:bg-primary/20 border border-white/5 flex items-center justify-between group transition-all min-h-0"
              >
                <span className="text-[9px] lg:text-xs font-bold truncate">{action}</span>
                <HiChevronRight className="hidden lg:block group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
          <div className="mt-2 p-2 rounded-xl bg-accent text-primary flex items-center gap-2 shrink-0">
            <HiLightningBolt size={12} />
            <span className="text-[9px] font-black uppercase tracking-tight">Online</span>
          </div>
        </div>

        {/* Row 4: Activity Bar (Spans 4 cols, 1 row) - STRICTLY COMPACT */}
        <div className="lg:col-span-4 bg-surface border border-border rounded-full px-4 flex items-center min-h-0 h-12 lg:h-auto self-center">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full py-1">
            <div className="hidden lg:flex items-center gap-2 border-r border-border pr-4 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-black uppercase text-muted">Activity</span>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: "New Student", time: "2m", color: "success" },
                { label: "Cert. Issued", time: "1h", color: "accent" },
                { label: "Center Audit", time: "3h", color: "secondary" },
                { label: "Result Pub", time: "5h", color: "primary" },
              ].map((log, i) => (
                <div key={i} className="shrink-0 flex items-center gap-2.5 pr-4 border-r border-border last:border-0">
                  <div className={`w-6 h-6 rounded-lg bg-${log.color}/10 text-${log.color} flex items-center justify-center`} >
                    <HiCheckCircle size={12} />
                  </div>
                  <div className="whitespace-nowrap">
                    <p className="text-[9px] font-bold leading-none">{log.label}</p>
                    <p className="text-[8px] text-muted">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}