// src/components/ui/Button.jsx
import { Children, cloneElement, isValidElement } from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 active:scale-95";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm shadow-primary/20",
    secondary:
      "bg-surface border border-border text-text hover:bg-bg hover:border-muted focus:ring-border",
    danger:
      "bg-danger text-white hover:bg-danger/90 focus:ring-danger/50 shadow-sm shadow-danger/20",
    ghost: "bg-transparent text-text hover:bg-bg focus:ring-border",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2",
  };

  // Build final class string
  const buttonClasses = [
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Process children to handle icons properly
  const processedChildren = Children.map(children, (child, index) => {
    // If it's an icon element (svg or icon component), add flex-shrink-0
    if (
      isValidElement(child) &&
      (child.type === "svg" ||
        child.props?.className?.includes("icon") ||
        // Common icon libraries detection
        ["Fi", "Hi", "Bs", "Ri", "Md", "Fa"].some(
          (prefix) =>
            child.type?.name?.startsWith(prefix) ||
            child.type?.displayName?.startsWith(prefix),
        ))
    ) {
      return cloneElement(child, {
        className: `flex-shrink-0 ${child.props.className || ""}`,
        "aria-hidden": true,
      });
    }
    return child;
  });

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full flex-shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        processedChildren
      )}
    </button>
  );
}
