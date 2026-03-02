// src/components/ui/Modal.jsx
import { useEffect } from "react";
import { useSmoothScroll } from "../../context/SmoothScroll";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) {
  const { disableLenis, enableLenis } = useSmoothScroll();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      disableLenis();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      enableLenis();
    }

    return () => {
      enableLenis();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, disableLenis, enableLenis]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md sm:max-w-lg",
    lg: "max-w-lg sm:max-w-2xl",
    xl: "max-w-xl sm:max-w-4xl",
    full: "max-w-full sm:max-w-full sm:m-4",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-surface text-text rounded-t-xl sm:rounded-xl shadow-2xl
          w-full ${sizeClasses[size]} border border-border
          flex flex-col max-h-[85vh] sm:max-h-[90vh]
          animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0
          duration-200 ease-out
        `}
      >
        {/* Header — fixed */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex justify-between items-center flex-shrink-0">
          <h2 className="text-base sm:text-lg font-heading font-semibold truncate pr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text p-1 rounded-lg hover:bg-bg transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>

        {/* Footer — fixed */}
        {footer && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-border flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
