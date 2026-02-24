// src/pages/public/News.jsx
import React from "react";

function NewsList({ title, items }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-primary mb-6">
        {title}
      </h2>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-none">
            <p className="text-text font-medium">{item.title}</p>
            <p className="text-muted text-sm mt-1">Date: {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function News() {
  const campusNews = [
    { title: "Diploma exam notice", date: "08/12/2025" },
    { title: "Promotion notice for teachers", date: "21/11/2025" },
    { title: "Scholarship notice", date: "30/10/2025" },
  ];

  const announcements = [
    { title: "Project Associate recruitment", date: "16/01/2026" },
    { title: "Research incentive notice", date: "25/12/2025" },
    { title: "Assistant professor recruitment", date: "18/11/2025" },
  ];

  const universityNews = [
    { title: "Registration instructions", date: "07/02/2026" },
    { title: "Semester course notice", date: "07/02/2026" },
    { title: "Education policy update", date: "06/02/2026" },
  ];

  return (
    <div className="bg-bg text-text">
      {/* Page header */}
      <section className="bg-primary text-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            University News & Announcements
          </h1>
        </div>
      </section>

      {/* News sections */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <NewsList title="Campus News" items={campusNews} />
          <NewsList title="Announcements" items={announcements} />
          <NewsList title="University News" items={universityNews} />
        </div>
      </section>
    </div>
  );
}
