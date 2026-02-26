// src/components/ui/Toast.jsx
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
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const config = variants[type] || variants.info;
  const Icon = config.icon;

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 16);

    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-sm animate-in slide-in-from-right-5 duration-200">
      <div
        className={`bg-surface border ${config.border} shadow-lg rounded-lg p-3 sm:p-4 flex items-start gap-3 relative overflow-hidden`}
      >
        {/* Progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 ${config.bg.replace("/10", "")} transition-all duration-100 ease-linear`}
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
            setVisible(false);
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
  );
}
