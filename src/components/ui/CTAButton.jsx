// src/components/ui/CTAButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const variants = {
  primary: {
    base: "bg-accent text-primary border-none shadow-lg",
    hover: "hover:bg-white hover:text-primary hover:shadow-xl",
    active: "active:scale-[0.97]",
  },
  secondary: {
    base: "bg-transparent border-2 border-accent text-accent",
    hover: "hover:bg-accent hover:text-primary hover:shadow-lg",
    active: "active:scale-[0.97]",
  },
  outline: {
    base: "border-2 border-white/40 text-white bg-transparent backdrop-blur-sm",
    hover: "hover:bg-white/10 hover:border-white/70",
    active: "active:scale-[0.97]",
  },
  glass: {
    base: `
      bg-white/10 backdrop-blur-md border border-white/30 
      text-white shadow-lg shadow-black/20
    `,
    hover:
      "hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:shadow-black/30",
    active: "active:scale-[0.98] active:bg-white/15",
  },
  gradient: {
    base: "bg-gradient-to-r from-accent via-purple-600 to-pink-600 text-white border-none shadow-lg",
    hover:
      "hover:from-accent hover:via-purple-500 hover:to-pink-500 hover:shadow-2xl",
    active: "active:scale-[0.97]",
  },
  minimal: {
    base: "bg-transparent text-white hover:text-accent border-b-2 border-transparent",
    hover: "hover:border-accent hover:pb-0.5",
    active: "active:opacity-75",
  },
};

const sizes = {
  sm: "px-5 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
  xl: "px-10 py-5 text-xl rounded-3xl",
};

const motionVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function CTAButton({
  children,
  variant = "primary", // primary | secondary | outline | glass | gradient | minimal
  size = "md", // sm | md | lg | xl
  className = "",
  disabled = false,
  icon: Icon = null, // optional lucide-react / heroicons component
  iconPosition = "left", // left | right
  motionProps = {}, // override framer-motion props if needed
  ...props
}) {
  const style = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      className={clsx(
        // base styles
        "relative font-bold uppercase tracking-wider",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary",
        "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none",
        // variant + size
        style.base,
        sizeClass,
        // hover & active from variant
        style.hover,
        style.active,
        // extra
        "flex items-center justify-center gap-2.5",
        className,
      )}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={motionVariants}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      {...motionProps}
      {...props}
    >
      {/* Left icon */}
      {Icon && iconPosition === "left" && (
        <Icon className="h-5 w-5 flex-shrink-0" />
      )}

      <span>{children}</span>

      {/* Right icon */}
      {Icon && iconPosition === "right" && (
        <Icon className="h-5 w-5 flex-shrink-0" />
      )}

      {/* Optional shine/glass effect layer (only for glass variant) */}
      {variant === "glass" && (
        <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
    </motion.button>
  );
}
