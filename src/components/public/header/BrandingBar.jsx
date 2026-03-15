/**
 * BrandingBar Component - Mobile First Responsive
 * Displays university logo, name, tagline, and recognition
 */
import { Link } from "react-router-dom";

export default function BrandingBar({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white border-b border-border w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4">
        {/* Logo and Text Container */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Logo */}
          <img
            src={data.logo}
            alt="university logo"
            className="h-12 sm:h-16 md:h-20 w-auto flex-shrink-0"
          />

          {/* University Info */}
          <div className="flex-1 sm:flex-none">
            <h1
              className="font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {data.universityName}
            </h1>

            <p className="text-xs sm:text-sm text-muted font-medium leading-snug">
              {data.tagline}
            </p>

            <p className="text-[10px] sm:text-xs text-muted/70 leading-snug">
              {data.recognition}
            </p>
          </div>
        </div>

        {/* Right Banner - Hidden on mobile, visible on tablet+ */}
        {data.rightBanner && (
          <Link to="/contact">
            <img
              src={data.rightBanner}
              alt="university banner"
              className="hidden sm:block h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
