import { useState, useEffect } from "react";

/**
 * GenericSlider Component - Reusable slider for any content
 * @param {Array} slides - Array of slide objects
 * @param {String} size - Size variant: 'small' | 'medium' | 'large'
 * @param {String} effect - Animation effect: 'fade' | 'slide'
 * @param {Boolean} autoPlay - Auto-rotate slides
 * @param {Number} autoPlayInterval - Interval in ms (default: 5000)
 */
export default function GenericSlider({
  slides = [],
  size = "medium",
  effect = "fade",
  autoPlay = true,
  autoPlayInterval = 5000,
  renderSlide,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length, autoPlayInterval]);

  if (!slides || slides.length === 0) return null;

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setCurrentSlide(index);
  };

  // Size classes
  const sizeClasses = {
    small: "h-48 sm:h-64",
    medium: "h-64 sm:h-80",
    large: "h-96 sm:h-[500px]",
  };

  // Effect classes
  const effectClasses = {
    fade: "opacity-0 group-[.active]:opacity-100",
    slide: "translate-x-full group-[.active]:translate-x-0",
  };

  return (
    <div
      className={`relative w-full ${sizeClasses[size]} bg-gray-900 rounded-lg overflow-hidden`}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`group ${
              index === currentSlide ? "active" : ""
            } absolute inset-0 transition-all duration-500 ${effectClasses[effect]}`}
          >
            {renderSlide ? (
              renderSlide(slide)
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white">
                <p className="text-center">
                  {slide.content || "Slide content"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
