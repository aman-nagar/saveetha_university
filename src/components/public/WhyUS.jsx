// src/components/public/WhyUS.jsx
import React from "react";

export default function WhyUs() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Why <span className="text-accent">Aryavart</span> International
            University?
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-surface/10 backdrop-blur-sm p-6 rounded-xl border border-white/2">
              <h3 className="text-xl font-heading font-semibold text-accent mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Academic Excellence
              </h3>
              <p className="text-white/90 leading-relaxed">
                Aryavart International University offers a wide range of
                academic programs in fields such as management, law, computer
                science, education, humanities, pharmacy, social sciences, skill
                and vocational education and many more. The University has a
                diverse faculty with many experts in their respective fields who
                provide students with a high-quality education.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-heading font-semibold text-accent mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Industry-Oriented Learning
              </h3>
              <p className="text-white/90 leading-relaxed">
                The curriculum is designed to ensure that students receive both
                theoretical and industry oriented practical knowledge, which
                prepares them for real-world challenges.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-heading font-semibold text-accent mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                State-of-the-Art Campus
              </h3>
              <p className="text-white/90 leading-relaxed">
                The University has a state-of-the-art campus with modern
                facilities. The campus has a library, computer labs, science
                labs, and sports facilities. The campus environment is conducive
                to learning and provides students with an excellent experience.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-heading font-semibold text-accent mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Research & Innovation
              </h3>
              <p className="text-white/90 leading-relaxed">
                The University has a strong focus on research and innovation.
                Research centers in various fields promote research and
                development. Students participate in research projects and gain
                practical experience through collaborations with leading
                industries and research institutions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats/Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { number: "50+", label: "Programs" },
            { number: "100+", label: "Expert Faculty" },
            { number: "5000+", label: "Students" },
            { number: "25+", label: "Research Centers" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center bg-surface/5 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="text-2xl md:text-3xl font-heading font-bold text-accent">
                {stat.number}
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
