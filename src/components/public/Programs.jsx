import React from "react";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * Programs Section Component
 * Displays available programs/courses
 * Data from context: home.programs[]
 */
export default function Programs() {
  const { home } = usePublicContent();
  const programsData = home?.programs;

  // Default programs if no data available
  const defaultPrograms = [
    {
      name: "Management",
      description: "High-quality curriculum with industry-focused learning.",
      duration: "2 years",
    },
    {
      name: "Law",
      description: "High-quality curriculum with industry-focused learning.",
      duration: "3 years",
    },
    {
      name: "Computer Science",
      description: "High-quality curriculum with industry-focused learning.",
      duration: "2 years",
    },
    {
      name: "Pharmacy",
      description: "High-quality curriculum with industry-focused learning.",
      duration: "2 years",
    },
  ];

  const programs = programsData?.length > 0 ? programsData : defaultPrograms;

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
              className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-heading font-semibold text-lg text-primary">
                {program.name}
              </h3>
              <p className="text-muted mt-2 text-sm">
                {program.description}
              </p>
              {program.duration && (
                <p className="text-xs text-muted mt-1">Duration: {program.duration}</p>
              )}

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
