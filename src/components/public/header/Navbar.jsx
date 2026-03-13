import { useState, useRef, useEffect } from "react";

/**
 * Navbar Component - Mobile First Responsive
 * Displays main navigation with mobile hamburger menu
 */
export default function Navbar({ items }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      style={{ background: "var(--color-primary)" }}
      className="sticky top-0 z-40 w-full shadow-md"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 lg:gap-6 text-white font-medium text-sm lg:text-base">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="px-3 lg:px-4 py-2 hover:bg-accent hover:text-primary rounded transition duration-200 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile/Tablet Navigation */}
        <div className="md:hidden flex justify-between items-center">
          {/* Brand Text for Mobile */}
          <span className="text-white font-bold text-sm">Menu</span>

          {/* Hamburger Button */}
          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-white/10 rounded transition"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
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

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute left-0 right-0 top-full bg-primary/95 border-t-2 border-accent shadow-lg backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto px-3 py-2 flex flex-col gap-1">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  className="block px-4 py-3 text-white hover:bg-accent hover:text-primary rounded transition duration-200 font-medium text-sm border-l-4 border-transparent hover:border-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
