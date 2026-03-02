import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  FaUserPlus,
  FaBookReader,
  FaFlask,
  FaGlobeAmericas,
} from "react-icons/fa";

const STEPS = [
  {
    title: "Seamless Admission",
    desc: "Digital-first process for BCA, Law, and more.",
    icon: <FaUserPlus />,
    side: "left",
  },
  {
    title: "Skill-Based Learning",
    desc: "Industry-oriented practicals and workshops.",
    icon: <FaBookReader />,
    side: "right",
  },
  {
    title: "Innovation & Research",
    desc: "State-of-the-art labs for your unique ideas.",
    icon: <FaFlask />,
    side: "left",
  },
  {
    title: "Global Placement",
    desc: "Connecting you with top MNCs and careers.",
    icon: <FaGlobeAmericas />,
    side: "right",
  },
];

export default function StepIntoaryavrat() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-4 relative">
        {/* Header */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-heading font-black text-primary italic">
            Step into <span className="text-accent">aryavrat</span>
          </h2>
          <p className="text-muted mt-4">
            The path to your global future is paved with excellence.
          </p>
        </div>

        {/* The Animated SVG "Road" */}
        <div className="absolute left-0 right-0 top-[300px] bottom-0 pointer-events-none hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M500 0 C 800 150, 800 250, 500 400 C 200 550, 200 650, 500 800 C 800 950, 800 1050, 500 1200"
              stroke="#c9a227"
              strokeWidth="4"
              strokeDasharray="10 10"
              style={{ pathLength }}
            />
          </svg>
        </div>

        <div className="space-y-32 relative z-20">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`flex w-full ${step.side === "left" ? "justify-start" : "justify-end"}`}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: step.side === "left" ? -100 : 100,
                }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 1 }}
                className="w-full md:w-[45%] group"
              >
                <div className="bg-primary p-8 rounded-[3rem] shadow-2xl border-2 border-accent/20 relative">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary text-2xl shadow-xl group-hover:rotate-12 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
