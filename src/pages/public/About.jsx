import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaLightbulb,
  FaBullseye,
  FaUniversity,
  FaMicroscope,
} from "react-icons/fa";
import AboutUsSection from "../../components/public/about/AboutUsSection";
import { publicMock } from "../../data/header.mock";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // Load mock data for about us section
    setAboutData(publicMock.aboutUs);
  }, []);

  return (
    <div className="bg-white text-primary">
      {/* New AboutUs Section - Featured at Top */}
      {aboutData && <AboutUsSection data={aboutData} />}

      {/* 1. Impact Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-accent rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Our Legacy
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6">
            Defining <span className="text-accent">Excellence.</span>
          </h1>
          <p className="max-w-6xl mx-auto text-white/80 text-lg md:text-xl font-light leading-relaxed">
            Aryavart International University is a sanctuary of innovation,
            blending traditional values with global academic standards.
          </p>
        </motion.div>
      </section>

      {/* 2. Quick Stats Bar */}
      <div className="bg-accent py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Campus Acres", value: "80+" },
            { label: "Degree Programs", value: "50+" },
            { label: "Expert Faculty", value: "100+" },
            { label: "Global Reach", value: "Infinite" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center border-r last:border-0 border-primary/10"
            >
              <div className="text-3xl font-black text-primary">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Identity Section (Bento Style) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 text-accent bg-accent/10 px-4 py-2 rounded-full">
                <FaHistory />
                <span className="font-bold text-sm uppercase tracking-tighter">
                  Established Heritage
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold leading-tight">
                A Tradition of <br />
                <span className="text-accent italic">
                  Institutional Brilliance
                </span>
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                Inheriting a legacy of quality from the Aryavart Group, our
                university stands as a beacon of professional education in the
                heart of Uttar Pradesh. We are recognized under the state's
                rigorous academic acts, ensuring every degree we grant is a
                global passport to success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-8 rounded-[2.5rem] space-y-4 hover:bg-primary hover:text-white transition-all duration-500 group">
                <FaUniversity className="text-3xl text-accent" />
                <h4 className="text-xl font-bold">Smart Campus</h4>
                <p className="text-sm opacity-70">
                  Technologically integrated classrooms and high-speed research
                  labs.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] mt-6 space-y-4 hover:bg-primary hover:text-white transition-all duration-500">
                <FaMicroscope className="text-3xl text-accent" />
                <h4 className="text-xl font-bold">Innovation Hub</h4>
                <p className="text-sm opacity-70">
                  An incubation center designed to turn student ideas into
                  startups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Vision & Mission (Split Interaction) */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-px bg-white/10">
          <div className="p-16 space-y-6 hover:bg-white/5 transition-colors">
            <FaBullseye className="text-5xl text-accent" />
            <h3 className="text-4xl font-heading font-bold">The Vision</h3>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              To be globally recognized for academic brilliance and social
              commitment. We prepare young minds to solve real-world challenges
              with creativity and compassion.
            </p>
          </div>
          <div className="p-16 space-y-6 hover:bg-white/5 transition-colors">
            <FaLightbulb className="text-5xl text-accent" />
            <h3 className="text-4xl font-heading font-bold">The Mission</h3>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              To provide transformative education through experiential learning
              and interdisciplinary research, equipping students to excel in
              their global careers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="py-24 text-center">
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <h2 className="text-3xl font-heading font-bold mb-8">
            Ready to start your journey?
          </h2>
          <button className="bg-accent text-primary px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl hover:bg-primary hover:text-white transition-all">
            Apply Now 2026
          </button>
        </motion.div>
      </section>
    </div>
  );
}
