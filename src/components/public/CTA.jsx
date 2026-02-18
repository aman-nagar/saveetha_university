import React from "react";

export default function CTA() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-heading font-bold">
          Start Your Academic Journey Today
        </h2>
        <p className="mt-4 text-white/90">
          Admissions are open for the upcoming session. Apply now and secure
          your future.
        </p>

        <button className="mt-8 bg-accent text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
          Apply Now
        </button>
      </div>
    </section>
  );
}
