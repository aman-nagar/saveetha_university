import { useState } from "react";
import GenericSlider from "./GenericSlider";

export default function AboutUsSection({ data }) {
  const [showFullContent, setShowFullContent] = useState(false);

  if (!data) return null;

  const { heading, content, tagline, readMoreText, profiles } = data;

  // Render profile slide
  const renderProfileSlide = (profile) => (
    <div className="relative w-full h-full overflow-hidden">
      {/* Gradient Overlay Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
        }}
      />

      <div className="relative h-full flex flex-col items-center justify-center px-6 py-8">
        {/* Profile Image - Circular */}
        <div className="mb-6 flex-shrink-0">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-accent object-cover shadow-lg"
          />
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-center mb-6 flex-grow flex items-center">
          <div>
            <p className="text-white text-sm sm:text-base leading-relaxed italic mb-4 max-w-2xl mx-auto">
              &quot;{profile.testimonial}&quot;
            </p>
          </div>
        </blockquote>

        {/* Name and Title */}
        <div className="text-center">
          <p className="text-white font-bold text-base sm:text-lg">
            {profile.name}
          </p>
          <p className="text-accent text-sm sm:text-base">{profile.title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full">
      {/* Upper Part - About Content */}
      <div
        className="relative py-12 sm:py-16 px-6 sm:px-8 min-h-96 flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/src/assets/images/success-path.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
                {heading}
              </h2>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-4">
                {showFullContent ? content : content.substring(0, 300) + "..."}
              </p>
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-accent hover:text-accent/80 font-semibold transition text-sm sm:text-base"
              >
                {showFullContent ? "Read Less..." : readMoreText}
              </button>
            </div>

            {/* Right Side - Social/Action Buttons */}
            <div className="flex flex-col gap-4 items-center md:items-end">
              {/* Social Icons */}
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919355822001"
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition shadow-lg"
                  title="Call us"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/919355822001"
                  className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition shadow-lg"
                  title="WhatsApp us"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.429.742 4.768 2.149 6.76l-2.288 6.884 7.094-2.353c1.994 1.084 4.232 1.656 6.591 1.656 5.455 0 9.859-4.338 9.859-9.934 0-2.618-.758-5.073-2.196-7.218A9.862 9.862 0 0011.051 6.979z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition shadow-lg"
                  title="Follow on Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white flex items-center justify-center transition shadow-lg"
                  title="Follow on Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.702.272.273 2.69.07 7.052.012 8.331 0 8.756 0 12c0 3.244.011 3.668.07 4.948.202 4.358 2.63 6.787 6.987 6.989 1.281.058 1.706.07 4.948.07 3.244 0 3.668-.012 4.948-.07 4.355-.202 6.785-2.632 6.987-6.989.058-1.28.07-1.704.07-4.948 0-3.243-.011-3.668-.07-4.948-.202-4.358-2.630-6.787-6.989-6.989-1.280-.058-1.704-.07-4.948-.07zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.162 12 18.162s6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.405c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44c.795 0 1.44.645 1.44 1.44s-.645 1.44-1.44 1.44z" />
                  </svg>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition text-sm sm:text-base flex items-center justify-center gap-2"
                  style={{
                    background: "var(--color-secondary)",
                    color: "white",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                  </svg>
                  Admission Enquiry
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition text-sm sm:text-base flex items-center justify-center gap-2"
                  style={{ background: "var(--color-primary)", color: "white" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  Online Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Tagline */}
      <div className="py-12 sm:py-16 px-6 text-center bg-white">
        <h3
          className="text-3xl sm:text-5xl font-heading font-bold text-center max-w-4xl mx-auto leading-tight"
          style={{ color: "var(--color-secondary)" }}
        >
          {tagline}
        </h3>
      </div>

      {/* Bottom Part - Profile Slider */}
      <div className="bg-gradient-to-b from-gray-100 to-white py-12 sm:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {profiles && profiles.length > 0 && (
            <GenericSlider
              slides={profiles}
              size="large"
              effect="fade"
              autoPlay={true}
              autoPlayInterval={6000}
              renderSlide={renderProfileSlide}
            />
          )}
        </div>
      </div>
    </section>
  );
}
