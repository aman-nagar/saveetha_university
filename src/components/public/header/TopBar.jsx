import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


export default function TopBar({ data }) {
  const [showLinks, setShowLinks] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setShowLinks(false);
      }
    }

    if (showLinks) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLinks]);

  if (!data) return null;

  return (
    <div
      className="text-white text-xs sm:text-sm w-full"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-3 sm:px-4 py-2 sm:py-3">
        {/* Contact Info - Hide email on mobile, show on tablet+ */}
        <div className="flex gap-2 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center sm:justify-start">
          <span className="hidden sm:inline flex items-center gap-1">
            📧 {data.email}
          </span>
          <span className="flex items-center gap-1">📞 {data.phone}</span>
        </div>

        {/* Right Side: Links, Admission Button, Language */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-end relative">
          {/* Quick Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-4">
            {data.links?.map((link) => (
              <Link
                key={link.label}
                to={link.url}
                className="hover:text-accent transition whitespace-nowrap text-xs sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Admission Button */}
          {data.admissionButton && (
            <Link
              to={data.admissionButton.url}
              className="px-3 sm:px-4 py-1 rounded-full font-semibold hover:scale-105 transition text-xs sm:text-sm whitespace-nowrap"
              style={{ background: "var(--color-accent)", color: "#000" }}
            >
              {data.admissionButton.label}
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            ref={buttonRef}
            onClick={() => setShowLinks(!showLinks)}
            className="md:hidden p-2 hover:bg-white/10 rounded transition"
            aria-label="Toggle menu"
            aria-expanded={showLinks}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                showLinks ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showLinks ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showLinks && (
        <div
          ref={menuRef}
          className="md:hidden bg-primary/95 border-t-2 border-accent/30 px-3 py-2"
        >
          {data.links?.map((link) => (
            <Link
              key={link.label}
              to={link.url}
              className="block py-2 px-2 hover:text-accent transition text-xs hover:bg-white/10 rounded mb-1"
              onClick={() => setShowLinks(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
