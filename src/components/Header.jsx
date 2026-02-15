// components/Header.jsx
import React, { useState, useEffect } from "react";

const Header = ({ siteData = {}, menuItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Default menu structure if API data not loaded yet
  const defaultMenu = [
    { id: 1, title: "Home", url: "/", order: 1, parent_id: null },
    {
      id: 2,
      title: "About",
      url: "#",
      order: 2,
      parent_id: null,
      children: [
        { id: 21, title: "Overview", url: "/about", order: 1, parent_id: 2 },
        {
          id: 22,
          title: "Leadership",
          url: "/leadership",
          order: 2,
          parent_id: 2,
        },
      ],
    },
    { id: 3, title: "Admission", url: "/admission", order: 3, parent_id: null },
  ];

  const navItems = menuItems.length > 0 ? menuItems : defaultMenu;
  const {
    universityName = "ARYAVART INTERNATIONAL UNIVERSITY",
    contactEmail = "info@aiuniversity.edu.in",
    contactPhone = "+91-9355822001",
  } = siteData;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top Bar - Hidden on mobile, visible on tablet up */}
      <div className="hidden sm:block bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-xs md:text-sm text-gray-600">
            <div className="flex space-x-4">
              <a
                href={`mailto:${contactEmail}`}
                className="hover:text-blue-600 transition-colors"
              >
                📧 {contactEmail}
              </a>
              <a
                href={`tel:${contactPhone}`}
                className="hover:text-blue-600 transition-colors"
              >
                📞 {contactPhone}
              </a>
            </div>
            <div className="flex space-x-4 mt-1 sm:mt-0">
              <a
                href="/verification"
                className="hover:text-blue-600 transition-colors"
              >
                Student Verification
              </a>
              <a
                href="/alumni"
                className="hover:text-blue-600 transition-colors"
              >
                Alumni
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo - Mobile optimized */}
          <a href="/" className="flex-1 md:flex-none">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 leading-tight">
              <span className="block text-blue-800">ARYAVART</span>
              <span className="block text-xs sm:text-sm font-normal text-gray-600">
                INTERNATIONAL UNIVERSITY
              </span>
            </div>
          </a>

          {/* Mobile Menu Button - Visible only on mobile */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu - Hidden on mobile, visible on large screens */}
          <ul className="hidden lg:flex items-center space-x-1 xl:space-x-4 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <a
                  href={item.url}
                  className="px-2 xl:px-3 py-2 hover:text-blue-700 inline-block transition-colors"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.id)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.title}
                  {item.children && (
                    <svg
                      className="inline-block w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </a>

                {/* Dropdown */}
                {item.children && activeDropdown === item.id && (
                  <ul
                    className="absolute left-0 mt-0 w-56 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.url}
                          className="block px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button - Mobile optimized */}
          <a
            href="/admission"
            className="hidden sm:inline-block bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            ADMISSION OPEN
          </a>
        </div>

        {/* Mobile Menu Panel - Slide down animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 last:border-0"
              >
                {item.children ? (
                  // Menu item with dropdown
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.id ? null : item.id,
                        )
                      }
                      className="w-full flex justify-between items-center py-3.5 px-2 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <span className="font-medium">{item.title}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          activeDropdown === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        activeDropdown === item.id ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.url}
                          className="block py-3 pl-6 pr-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular menu item
                  <a
                    href={item.url}
                    className="block py-3.5 px-2 text-gray-700 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <a
              href="/admission"
              className="block w-full mt-4 bg-blue-600 text-white text-center px-4 py-3.5 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ADMISSION OPEN
            </a>

            {/* Mobile Contact Info */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
              <a
                href={`mailto:${contactEmail}`}
                className="block py-2 hover:text-blue-600"
              >
                📧 {contactEmail}
              </a>
              <a
                href={`tel:${contactPhone}`}
                className="block py-2 hover:text-blue-600"
              >
                📞 {contactPhone}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
