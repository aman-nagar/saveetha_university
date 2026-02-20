// src/components/ui/Button.jsx
import clsx from "clsx";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon = null,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    secondary:
      "bg-surface border border-border text-text hover:bg-bg focus:ring-border",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50",
    ghost: "bg-transparent text-text hover:bg-bg focus:ring-border",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      )}
      {icon && !loading && icon}
      <span>{children}</span>
    </button>
  );
}
