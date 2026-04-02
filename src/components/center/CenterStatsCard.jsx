// src/components/center/CenterStatsCard.jsx
import React from "react";

export default function CenterStatsCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">{title}</p>
          <p className="text-3xl font-extrabold text-text">{value}</p>
        </div>
        <div className={`p-4 rounded-xl transition-colors ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {/* Decorative progress-like bar for UI "best" look */}
      <div className="mt-4 w-full bg-bg h-1.5 rounded-full overflow-hidden">
        <div className={`h-full opacity-70 rounded-full w-2/3 ${colorClass.split(' ')[0].replace('text', 'bg')}`}></div>
      </div>
    </div>
  );
}