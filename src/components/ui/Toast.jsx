import { useEffect, useState } from "react";
import {
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
  HiExclamation,
} from "react-icons/hi";

const variants = {
  success: {
    icon: HiCheckCircle,
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  error: {
    icon: HiXCircle,
    bg: "bg-danger/10",
    text: "text-danger",
    border: "border-danger/20",
  },
  warning: {
    icon: HiExclamation,
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
  },
  info: {
    icon: HiInformationCircle,
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
};

export default function Toast({
  type = "info",
  title,
  message,
  duration = 3000,
  onClose,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  const config = variants[type] || variants.info;
  const Icon = config.icon;

  useEffect(() => {
    let interval;

    // If we aren't paused and there is time left, start the countdown
    if (!isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 10));
      }, 10);
    } else if (timeRemaining <= 0) {
      // Once time hits zero, trigger the close logic
      onClose && onClose();
    }

    return () => clearInterval(interval);
  }, [isPaused, timeRemaining, onClose]);

  // Calculate progress percentage based on remaining time
  const progress = (timeRemaining / duration) * 100;

  if (timeRemaining <= 0) return null;

  return (
    <div
      className="fixed top-4 left-4 right-4 sm:top-5 sm:right-5 sm:left-auto z-50 flex flex-col gap-2 sm:gap-3 items-stretch sm:items-end"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-sm animate-in slide-in-from-right-5 duration-200">
        <div
          className={`bg-surface border ${config.border} shadow-lg rounded-lg p-3 sm:p-4 flex items-start gap-3 relative overflow-hidden cursor-default`}
        >
          {/* Progress bar */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 ${config.bg.replace("/10", "")} transition-all duration-10 ease-linear`}
            style={{ width: `${progress}%` }}
          />

          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg ${config.bg} ${config.text} shrink-0`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="flex-1 min-w-0">
            {title && (
              <p className="font-semibold text-text text-sm sm:text-base">
                {title}
              </p>
            )}
            <p className="text-xs sm:text-sm text-muted line-clamp-2">
              {message}
            </p>
          </div>

          <button
            onClick={() => {
              setTimeRemaining(0);
              onClose && onClose();
            }}
            className="text-muted hover:text-text p-1 rounded-lg hover:bg-bg transition-colors shrink-0"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
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
      </div>
    </div>
  );
}
