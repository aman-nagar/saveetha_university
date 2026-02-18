// src/components/public/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <>
      <section className="h-[70vh] bg-primary text-white ">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
              Shaping Futures Through Quality Education
            </h1>

            <p className="mt-6 text-white/90 text-lg">
              Industry-oriented programs, experienced faculty, and a modern
              campus designed for tomorrow’s leaders.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold">
                Apply Now
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition">
                Explore Programs
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="hidden md:block">
            <img
              src="https://saveethaamaravatiuniversity.ac.in/uploads/slider__17705748893.jpg"
              alt="Campus"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
