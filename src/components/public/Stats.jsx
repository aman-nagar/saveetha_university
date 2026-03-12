import React from "react";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * Stats Section Component
 * Displays key statistics
 * Data from context: home.stats
 */
export default function Stats() {
  const { home } = usePublicContent();
  const statsData = home?.stats;

  // Default stats if no data available
  const defaultStats = [
    { number: "50+", label: "Programs" },
    { number: "100+", label: "Expert Faculty" },
    { number: "5000+", label: "Students" },
    { number: "25+", label: "Research Centers" },
  ];

  // Convert object stats to array if needed
  let stats = defaultStats;
  if (statsData) {
    if (Array.isArray(statsData)) {
      stats = statsData;
    } else if (typeof statsData === "object") {
      // Convert object {students: 5000, faculty: 200, ...} to array
      stats = [
        { number: `${statsData.programs || 25}+`, label: "Programs" },
        { number: `${statsData.faculty || 200}+`, label: "Expert Faculty" },
        { number: `${statsData.students || 5000}+`, label: "Students" },
        { number: `${statsData.research || 50}+`, label: "Research Centers" },
      ];
    }
  }

  return (
    <section className="bg-bg py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-surface rounded-xl shadow-sm border border-border p-6 text-center"
          >
            <div className="text-2xl md:text-3xl font-heading font-bold text-primary">
              {stat.number}
            </div>
            <div className="text-muted mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
