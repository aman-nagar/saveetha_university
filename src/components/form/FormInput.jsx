// src/components/form/FormInput.jsx
import { FiAlertCircle } from "react-icons/fi";

export default function FormInput({
  label,
  name,
  register,
  required,
  rules = {},
  type = "text",
  placeholder,
  error,
  rightIcon,
  className = "",
  ...rest
}) {
  const registerProps = register ? register(name, { required, ...rules }) : {};

  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      {label && (
        <label className="text-xs sm:text-sm font-medium text-text">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...registerProps}
          {...rest}
          className={`
            w-full border rounded-lg px-3 py-2 sm:py-2.5
            bg-surface text-text text-sm sm:text-base
            placeholder:text-muted/60
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200
            ${
              error
                ? "border-danger ring-1 ring-danger/30"
                : "border-border hover:border-muted/50"
            }
          `}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <FiAlertCircle className="w-3 h-3 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}
