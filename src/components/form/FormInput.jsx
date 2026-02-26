// src/components/form/FormInput.jsx
import { FiAlertCircle } from "react-icons/fi";

export default function FormInput({
  label,
  name,
  register,
  required,
  type = "text",
  placeholder,
  error,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      <label className="text-xs sm:text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`
          w-full border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base
          placeholder:text-muted/60
          focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
          transition-all duration-200
          ${error ? "border-danger ring-1 ring-danger/30" : "border-border hover:border-muted/50"}
        `}
      />

      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <FiAlertCircle className="w-3 h-3 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}