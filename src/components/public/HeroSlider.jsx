// src/components/public/HeroSlider.jsx
import { Carousel } from "flowbite-react";
import { usePublicContent } from "@/hooks/usePublicContent";

export function HeroSlider() {
  const { home, sliders } = usePublicContent();

  // Default slider data if no API data available
  const defaultSlides = [
    {
      id: 1,
      title: "Welcome to Saveetha Amaravati University",
      subtitle: "Excellence in Education",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
      bgColor: "bg-primary",
    },
    {
      id: 2,
      title: "State-of-the-Art Facilities",
      subtitle: "Modern Campus for Tomorrow's Leaders",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
      bgColor: "bg-primary",
    },
    {
      id: 3,
      title: "Shape Your Bright Future",
      subtitle: "Join Our Community of Achievers",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      bgColor: "bg-primary",
    },
    {
      id: 4,
      title: "Innovation & Research",
      subtitle: "Discover Your Potential",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
      bgColor: "bg-primary",
    },
  ];

  // Use API sliders if available, fallback to home.slider, then use defaults
  const slides =
    sliders?.length > 0
      ? sliders
      : home?.slider?.length > 0
        ? home.slider
        : defaultSlides;

  return (
    <div className="h-[80vh] min-h-screen relative overflow-hidden">
      <Carousel className="h-full !rounded-none" indicators={true}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`flex h-full w-full items-center justify-center ${slide.bgColor || "bg-primary"} relative overflow-hidden group`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              className="absolute inset-0 w-full h-full object-cover"
              alt={slide.title}
              referrerPolicy="no-referrer"
            />

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-overlay via-overlay to-overlay/80"></div>

            {/* Decorative Accent - Top Left */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-xl -translate-x-20 -translate-y-20 pointer-events-none" />

            {/* Decorative Accent - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-xl translate-x-20 translate-y-20 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
              {/* University Logo Badge (optional) */}
              <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/30">
                <div className="w-6 h-6 rounded-full bg-accent/80"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Saveetha Amaravati University
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4 leading-tight drop-shadow-xl">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 font-medium drop-shadow-lg">
                {slide.subtitle}
              </p>

              {/* CTA Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 sm:px-10 py-3 sm:py-4 bg-accent text-primary font-bold text-sm sm:text-base rounded-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  Explore Programs
                </button>
                <button className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-bold text-sm sm:text-base rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </div> */}

              {/* Slide Indicator Info */}
              <div className="mt-12 text-white/60 text-xs font-mono">
                {idx + 1} / {slides.length}
              </div>
            </div>

            {/* Bottom Gradient Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </div>
        ))}
      </Carousel>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
    </div>
  );
}
