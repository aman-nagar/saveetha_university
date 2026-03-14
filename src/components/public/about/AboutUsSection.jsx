import { useState } from "react";
import GenericSlider from "./GenericSlider";
import studentImg from "../../../assets/images/student.jpg";
import bgImage from "../../../assets/images/success-path.jpg";

export default function AboutUsSection({ data }) {
  const [showFullContent, setShowFullContent] = useState(false);

  // If data is missing, we use this fallback dummy data
  const profiles =
    data?.profiles?.length > 0
      ? data.profiles
      : [
          {
            id: 1,
            name: "Dr. Gunjan Bansal",
            title: "Chancellor",
            image: studentImg,
            testimonial:
              "It is my great pleasure to welcome you all to the first academic year at Saveetha Amravati University. As the Chancellor of this esteemed institution, I am thrilled to see our university grow and evolve to meet the ever-changing needs of our students and society. Our commitment to providing a transformative educational experience is unwavering.",
          },
          {
            id: 2,
            name: "Aman Srivastava",
            title: "Alumni (B.Tech)",
            image: studentImg,
            testimonial:
              "The environment here is perfect for growth. The faculty members are not just teachers but mentors who guide you at every step. The focus on practical learning and industry exposure truly prepares you for the global market.",
          },
        ];

  const {
    heading = "About Us",
    content = "Welcome to Saveetha Amravati University...",
    tagline = "SA: A GATEWAY TO HIGHER EDUCATION",
  } = data || {};

  const renderProfileSlide = (profile) => (
    <div className="w-full h-full flex items-center justify-center">
      {/* Background stays dark to ensure text is visible */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[8px] border-white/10 overflow-hidden shadow-2xl">
            <img
              src={profile.image} // This uses studentImg from your fallback
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="flex-1 text-white text-left">
          <div className="mb-4">
            <span className="text-6xl font-serif text-accent opacity-50 block h-8">
              “
            </span>
            <p className="text-lg md:text-xl leading-relaxed font-light italic text-gray-100">
              {profile.testimonial}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-accent/30">
            <p className="text-xl md:text-2xl font-bold tracking-tight">
              {profile.name}
            </p>
            <p className="text-accent font-medium uppercase tracking-widest text-sm">
              {profile.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full">
      {/* 1. TOP SECTION: PARALLAX INTRO */}
      {/* 1. TOP SECTION */}
      <div
        className="relative pt-24 md:pt-32 pb-20 md:pb-32 px-6 text-center bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-10 tracking-tight">
            {heading}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-10"></div>
          <p className="text-white/90 text-sm md:text-lg leading-loose mb-8 font-light">
            {showFullContent ? content : content.substring(0, 450) + "..."}
          </p>
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="group text-accent hover:text-white font-bold transition-all text-sm uppercase tracking-widest flex items-center gap-3 mx-auto border border-accent/40 px-6 py-2 rounded-full hover:bg-accent mb-12"
          >
            {showFullContent ? "Read Less" : "Read More"}
            <span className="group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* 2. THE DIVIDER BANNER */}
        {/* Positioning it at the bottom with half-out overlap */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-20 px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-xl bg-bg/20 border border-secondary/1 py-4 md:py-8 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl md:text-2xl lg:text-4xl font-heading font-black text-center text-bg uppercase tracking-[0.2em] leading-tight">
              <span className="block drop-shadow-lg">{tagline}</span>
            </h3>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION (Padded to account for the overlapping divider) */}
      <div
        className="relative min-h-[600px] bg-fixed bg-cover bg-center flex items-center pt-20"
        style={{
          backgroundImage: ` linear-gradient(rgb(143 70 70 / 85%), rgba(0, 0, 0, 0.85)),  url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069')`,
        }}
      >
        <div className="w-full">
          {profiles.length > 0 && (
            <GenericSlider
              slides={profiles}
              size="large"
              effect="fade"
              autoPlay={true}
              renderSlide={renderProfileSlide}
            />
          )}
        </div>
      </div>
    </section>
  );
}
