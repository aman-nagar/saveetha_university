import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
} from "react-icons/fa";

const REVIEWS = [
  {
    id: 1,
    name: "Tangi Ravikumar",
    course: "Bachelor of Science",
    year: "Final Year",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "The placement cell here is exceptional. I secured a package with a top MNC thanks to the rigorous mock interviews and technical workshops organized by the faculty.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    course: "MBA Marketing",
    year: "Batch of 2025",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "What I love most is the balance between academics and the annual cultural fest. It feels like a second home, and the mentors are always available for guidance.",
  },
  {
    id: 3,
    name: "Rohan Das",
    course: "B.Des Fashion Design",
    year: "2nd Year",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    content:
      "The state-of-the-art design labs and the industry exposure we get through guest lectures from experts have completely transformed my creative perspective.",
  },
];

export default function StudentReviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mt-2">
            What Our <span className="text-accent">Students Say</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10">
            <button
              onClick={prevStep}
              className="p-3 rounded-full bg-surface shadow-lg text-primary hover:bg-accent hover:text-white transition-all"
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10">
            <button
              onClick={nextStep}
              className="p-3 rounded-full bg-surface shadow-lg text-primary hover:bg-accent hover:text-white transition-all"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Review Card Slider */}
          <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
              >
                {/* Decorative Background Icon */}
                <FaQuoteLeft className="absolute -top-4 -left-2 text-primary/5 text-9xl" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  {/* Student Image */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent overflow-hidden shadow-inner">
                      <img
                        src={REVIEWS[index].image}
                        alt={REVIEWS[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-md">
                      <FaGraduationCap size={16} />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="text-center md:text-left">
                    <p className="text-muted italic text-lg leading-relaxed mb-6">
                      "{REVIEWS[index].content}"
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-primary">
                        {REVIEWS[index].name}
                      </h4>
                      <p className="text-accent font-medium text-sm">
                        {REVIEWS[index].course} | {REVIEWS[index].year}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === i
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-accent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
