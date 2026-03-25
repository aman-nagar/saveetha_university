import { Link } from "react-router-dom";

export default function TopBar({ data }) {
  if (!data) return null;

  return (
    <div
      className="text-white text-xs sm:text-sm w-full"
      style={{ background: "var(--color-secondary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-4 py-2 sm:py-2.5">
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm">
          {/* Email remains hidden on mobile to save space, visible on tablet+ */}
          <span className="hidden sm:flex items-center gap-1.5">
            📧 {data.email}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            📞 {data.phone}
          </span>
        </div>

        {/* Right Side: Links & Admission Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Quick Links (e.g., Login) - Now visible inline on ALL screens */}
          <div className="flex items-center gap-3 sm:gap-4">
            {data.links?.map((link) => (
              <Link
                key={link.label}
                to={link.url}
                className="hover:text-accent transition-colors whitespace-nowrap font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Admission Button (if present) */}
          {data.admissionButton && (
            <Link
              to={data.admissionButton.url}
              className="px-3 sm:px-4 py-1 rounded-full font-bold hover:scale-105 transition-transform whitespace-nowrap"
              style={{ background: "var(--color-accent)", color: "#000" }}
            >
              {data.admissionButton.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
