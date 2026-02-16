import React from "react";

export default function Stats() {
  const stats = [
    { number: "50+", label: "Programs" },
    { number: "100+", label: "Expert Faculty" },
    { number: "5000+", label: "Students" },
    { number: "25+", label: "Research Centers" },
  ];

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
