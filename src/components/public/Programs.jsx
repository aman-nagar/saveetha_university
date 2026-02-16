import React from "react";

export default function Programs() {
  const programs = [
    "Management",
    "Law",
    "Computer Science",
    "Pharmacy",
    "Education",
    "Humanities",
  ];

  return (
    <section className="py-16 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">
            Our Programs
          </h2>
          <p className="text-muted mt-3">
            Explore industry-relevant courses designed for real-world success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-heading font-semibold text-lg text-primary">
                {program}
              </h3>
              <p className="text-muted mt-2 text-sm">
                High-quality curriculum with industry-focused learning.
              </p>

              <button className="mt-4 text-secondary font-medium hover:underline">
                View details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
