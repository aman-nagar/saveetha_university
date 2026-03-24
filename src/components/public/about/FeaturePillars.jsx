import { motion } from "framer-motion";
import { FaUniversity, FaIndustry, FaUsers, FaRocket } from "react-icons/fa";

export default function FeaturePillars() {
  const pillars = [
    {
      id: 1,
      icon: FaUniversity,
      title: "Modern Campus & Learning Environment",
      description:
        "Saveetha Amaravati University offers a modern, student-centric campus designed to promote creativity, innovation, and academic excellence. The campus environment supports collaborative learning, research, and extracurricular development. Students have access to modern classrooms, advanced laboratories, research facilities, and digital learning resources that support a future-ready education system.",
    },
    {
      id: 2,
      icon: FaIndustry,
      title: "Industry-Focused Education & Future Skills",
      description:
        "Academic programs are designed to align with Education 4.0, Industry 4.0, Education 5.0 and Industry 5.0. Through industry collaborations, practical training, internships, and project-based learning, students gain the skills, knowledge, and confidence required to succeed in competitive industries and evolving job markets.",
    },
    {
      id: 3,
      icon: FaUsers,
      title: "Experienced Faculty & Research Excellence",
      description:
        "The faculty consists of experienced professors, academic researchers, and industry professionals dedicated to guiding students toward success. Faculty members actively encourage research, innovation, entrepreneurship, and critical thinking, ensuring students graduate with both academic knowledge and real-world problem-solving abilities.",
    },
    {
      id: 4,
      icon: FaRocket,
      title: "Vision for the Future",
      description:
        "Aiming to become a leading center for higher education, innovation, and research in India. By fostering academic excellence, ethical values, and global perspectives, committed to shaping future leaders, entrepreneurs, and responsible global citizens.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
            Four Pillars of <span className="text-accent">Excellence</span>
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-muted text-lg">
            Our institution is built on four core strengths that set us apart
            and prepare students for success
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="text-3xl text-accent" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed flex-grow">
                    {pillar.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="h-1 w-8 bg-gradient-to-r from-accent to-secondary rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
