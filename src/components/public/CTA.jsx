import React from "react";
import { Link } from "react-router-dom";
import { usePublicContent } from "@/hooks/usePublicContent";

/**
 * CTA (Call To Action) Section Component
 * Displays a promotional section with CTA buttons
 * Data from context: home (uses home-level CTA if available)
 */
export default function CTA() {
  const { home } = usePublicContent();
  const ctaSection = home?.cta;

  // Default CTA if no data available
  const defaultCTA = {
    title: "Start Your Academic Journey Today",
    description:
      "Admissions are open for the upcoming session. Apply now and secure your future.",
    buttons: [{ text: "Apply Now", variant: "primary", link: "/contact" }],
  };

  const cta = ctaSection || defaultCTA;

  if (!cta) return null;

  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-heading font-bold">{cta.title}</h2>
        <p className="mt-4 text-white/90">{cta.description}</p>

        {/* CTA Buttons */}
        {cta.buttons && cta.buttons.length > 0 && (
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            {cta.buttons.map((button, idx) =>
              button.link ? (
                <Link
                  key={idx}
                  to={button.link}
                  className={`font-semibold px-8 py-3 rounded-lg transition ${
                    button.variant === "secondary"
                      ? "bg-white text-primary hover:opacity-90"
                      : "bg-accent text-primary hover:opacity-90"
                  }`}
                >
                  {button.text}
                </Link>
              ) : (
                <button
                  key={idx}
                  className={`font-semibold px-8 py-3 rounded-lg transition ${
                    button.variant === "secondary"
                      ? "bg-white text-primary hover:opacity-90"
                      : "bg-accent text-primary hover:opacity-90"
                  }`}
                >
                  {button.text}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
