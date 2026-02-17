import React from "react";
import { Link } from "react-router-dom";

function NewsColumn({ title, items, headerColor }) {
  return (
    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-md">
      {/* Header */}
      <div
        className="text-white text-center py-3 font-heading font-semibold"
        style={{ backgroundColor: headerColor }}
      >
        {title}
      </div>

      {/* Scrolling area */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute w-full animate-scroll">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex gap-3 px-4 py-3 border-b border-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                N
              </div>

              <div className="text-sm">
                <p className="text-text font-medium">{item.title}</p>
                <p className="text-muted text-xs">Date: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-3">
        <Link
          to="/news"
          className="text-secondary font-semibold text-sm hover:underline"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
}

export default function HighlightNews() {
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
    <section className="py-16 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Better heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-text relative inline-block">
            News & Updates
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <NewsColumn
            title="Campus News"
            items={campusNews}
            headerColor="#0b1f4b"
          />
          <NewsColumn
            title="Announcements"
            items={announcements}
            headerColor="#b23a3a"
          />
          <NewsColumn
            title="University News"
            items={universityNews}
            headerColor="#c9a227"
          />
        </div>
      </div>
    </section>
  );
}
