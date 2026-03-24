import { motion } from "framer-motion";

export default function SponsoringBody() {
  const sections = [
    {
      id: 1,
      title: "Sponsoring Body's Mission",
      content: `The sponsoring body behind Saveetha Amaravati University plays a vital role in shaping the institution's vision, governance, and long-term academic growth. The foundation is dedicated to promoting quality education, research, and innovation while creating opportunities for students from diverse backgrounds. Its mission is to develop an education system that blends discipline, culture, ethics, and modern technological knowledge. By focusing on both academic excellence and character development, the institution prepares students to become responsible professionals and global citizens.`,
    },
    {
      id: 2,
      title: "Social Responsibility & Community Development",
      content: `The sponsoring body believes strongly in social responsibility and community development. Through various educational initiatives and outreach programs, it works toward providing access to education and supporting the growth of underprivileged communities. The institution is dedicated to creating opportunities for students from diverse backgrounds and fostering an inclusive learning environment that celebrates diversity and encourages critical thinking.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Our Commitment
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
            <span className="text-accent">Sponsoring Body</span> & Values
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl transform"></div>

              {/* Card Content */}
              <div className="relative p-8 rounded-2xl border border-accent/20">
                {/* Title with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-accent to-secondary rounded-full"></div>
                  <h3 className="text-2xl font-bold text-primary font-heading">
                    {section.title}
                  </h3>
                </div>

                {/* Content */}
                <p className="text-muted leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-accent/20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary mb-4 font-heading">
              Building Tomorrow's Leaders
            </h3>
            <p className="text-muted text-lg leading-relaxed">
              Through interdisciplinary education, cutting-edge research, and
              industry partnerships, we prepare students to become innovators,
              entrepreneurs, and leaders who create positive change. Our vision
              is to build an inclusive learning community that celebrates
              diversity, encourages critical thinking, and fosters a spirit of
              lifelong learning and social contribution.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
