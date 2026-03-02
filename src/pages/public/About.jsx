// src/pages/public/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="bg-bg text-text">
      {/* Hero / Page Title */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            About aryavrat Amaravati University
          </h1>
          <p className="mt-4 text-white/90">
            A transformative educational experience built on academic
            excellence, innovation, and holistic development.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          {/* Intro */}
          <div>
            <p className="text-lg leading-relaxed text-muted">
              aryavrat Amaravati University is located on an 80-acre green
              campus in Vijayawada, Andhra Pradesh, and is committed to
              delivering a transformative educational experience that blends
              academic excellence, innovation, and holistic development.
            </p>
          </div>

          {/* Legacy */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Our Legacy & Identity
            </h2>
            <p className="text-muted leading-relaxed">
              Established as part of the renowned aryavrat Group of Educational
              Institutions, the university inherits a tradition of quality
              education and institutional excellence. It is recognised under the
              Andhra Pradesh Amendment Act No. 8 of 2005 and under Section 2(f)
              of the University Grants Commission (UGC) Act, 1956.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              aryavrat Amaravati University was founded with the vision of
              advancing world-class education in the emerging capital region of
              Amaravati. It offers a dynamic and interdisciplinary learning
              environment, with a strong focus on Allied Health Sciences,
              Paramedical Studies, research, and professional education.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Vision
              </h3>
              <p className="text-muted leading-relaxed">
                To become a globally respected university known for academic
                brilliance, social commitment, and innovation-driven learning.
                The university aims to prepare young minds to solve real-world
                challenges with responsibility, creativity, and compassion.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                Mission
              </h3>
              <p className="text-muted leading-relaxed">
                To provide transformative education that equips students with
                knowledge, skills, and ethical values needed to excel in their
                careers and make meaningful contributions to society. This
                mission integrates academic inquiry with real-world impact
                through experiential learning, interdisciplinary research, and
                holistic development.
              </p>
            </div>
          </div>

          {/* Campus */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Campus & Infrastructure
            </h2>
            <p className="text-muted leading-relaxed">
              The university campus spans 80 acres and includes smart
              classrooms, state-of-the-art laboratories, research centers,
              libraries, hostels, and sports facilities — all designed to
              inspire innovation and collaboration.
            </p>
          </div>

          {/* Career Focus */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Academic & Career Focus
            </h2>
            <p className="text-muted leading-relaxed">
              aryavrat Amaravati University emphasizes outcome-based education,
              student-centric learning, and strong industry partnerships. A
              robust Career Development and Placement Cell connects students
              with top recruiters through training, internships, and campus
              recruitment drives.
            </p>
          </div>

          {/* Partnerships */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Partnerships & Innovation
            </h2>
            <p className="text-muted leading-relaxed">
              The university collaborates with leading global institutions,
              research bodies, and industries to promote academic excellence,
              innovation, and entrepreneurship. Its incubation center supports
              startup initiatives through mentorship, funding, and
              infrastructure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
