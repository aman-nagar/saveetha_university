// src/pages/public/sections/AcademicStreams.jsx
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaGavel,
  FaPills,
  FaMicroscope,
  FaChartLine,
  FaPalette,
} from "react-icons/fa";

const STREAMS = [
  {
    title: "Computer Applications",
    subtitle: "BCA & IT Excellence",
    icon: <FaLaptopCode />,
    size: "md:col-span-2 md:row-span-2",
    bg: "bg-primary text-white",
    accent: "text-accent",
  },
  {
    title: "Legal Studies",
    subtitle: "LL.B & Honors",
    icon: <FaGavel />,
    size: "md:col-span-1 md:row-span-1",
    bg: "bg-white text-primary",
    accent: "text-secondary",
  },
  {
    title: "Pharmacy",
    subtitle: "Medical Innovation",
    icon: <FaPills />,
    size: "md:col-span-1 md:row-span-1",
    bg: "bg-white text-primary",
    accent: "text-success",
  },
  {
    title: "Management",
    subtitle: "MBA & BBA Leadership",
    icon: <FaChartLine />,
    size: "md:col-span-2 md:row-span-1",
    bg: "bg-gray-50 text-primary",
    accent: "text-primary",
  },
  {
    title: "Pure Sciences",
    subtitle: "Research & Discovery",
    icon: <FaMicroscope />,
    size: "md:col-span-1 md:row-span-2",
    bg: "bg-accent text-primary",
    accent: "text-white",
  },
  {
    title: "Humanities",
    subtitle: "Arts & Social Science",
    icon: <FaPalette />,
    size: "md:col-span-1 md:row-span-1",
    bg: "bg-white text-primary",
    accent: "text-secondary",
  },
];

export default function AcademicStreams() {
  return (
    <section className="py-24 bg-gray-50/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary">
              Global Academic <span className="text-accent">Streams</span>
            </h2>
            <div className="h-1.5 w-20 bg-primary mt-4 rounded-full" />
            <p className="mt-6 text-muted text-lg">
              Explore our diverse range of world-class programs designed to
              shape the leaders of tomorrow.
            </p>
          </div>
          <button className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
            View All Courses
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
          {STREAMS.map((stream, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden ${stream.size} ${stream.bg}`}
            >
              {/* Top Section: Icon & Decorative Glow */}
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner ${stream.bg.includes("primary") ? "bg-white/10" : "bg-gray-100"} ${stream.accent}`}
                >
                  {stream.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left">
                  {stream.title}
                </h3>
                <p className={`text-sm font-medium opacity-70`}>
                  {stream.subtitle}
                </p>
              </div>

              {/* Bottom Section: Explore Link */}
              <div className="relative z-10 mt-8 flex items-center gap-2 font-bold text-sm cursor-pointer">
                <span className="group-hover:mr-2 transition-all">
                  Explore Department
                </span>
                <span className="text-xl">→</span>
              </div>

              {/* Background Glass Ornament */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-current opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
