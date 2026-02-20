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
    bg: "bg-green-100 dark:bg-green-800",
    text: "text-green-600 dark:text-green-200",
  },
  error: {
    icon: HiXCircle,
    bg: "bg-red-100 dark:bg-red-800",
    text: "text-red-600 dark:text-red-200",
  },
  warning: {
    icon: HiExclamation,
    bg: "bg-yellow-100 dark:bg-yellow-800",
    text: "text-yellow-600 dark:text-yellow-200",
  },
  info: {
    icon: HiInformationCircle,
    bg: "bg-blue-100 dark:bg-blue-800",
    text: "text-blue-600 dark:text-blue-200",
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
  const config = variants[type] || variants.info;
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-surface border border-border shadow-lg rounded-lg p-4 flex items-start gap-3 min-w-[260px]">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${config.bg} ${config.text}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1">
          {title && <p className="font-semibold text-text">{title}</p>}
          <p className="text-sm text-muted">{message}</p>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-muted hover:text-text"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
