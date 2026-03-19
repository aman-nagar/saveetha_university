// src/components/form/FormSelect.jsx
import { FiAlertCircle, FiInfo } from "react-icons/fi";

export default function FormSelect({
  label,
  name,
  register,
  options = [],
  required,
  error,
  disabled = false,
  placeholder = "Select",
  onChangeCb, // optional: called with the full option object on change
  className = "",
  isLoading = false, // shows spinner inside select
  isEmpty = false, // shows "no data available" message if no options
}) {
  const { onChange, ...rest } = register(name, { required });

  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      <label className="text-xs sm:text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* Relative wrapper for spinner positioning */}
      <div className="relative">
        <select
          {...rest}
          disabled={disabled}
          onChange={(e) => {
            onChange(e); // keep RHF in sync
            if (onChangeCb) {
              const selected = options.find(
                (o) => String(o.value) === e.target.value,
              );
              onChangeCb(selected || null);
            }
          }}
          className={`
            w-full border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200
            ${error ? "border-danger ring-1 ring-danger/30" : "border-border hover:border-muted/50"}
            ${disabled ? "cursor-not-allowed opacity-70" : ""}
          `}
        >
          <option key="__empty__" value="">
            {isLoading ? "Loading..." : placeholder}
          </option>
          {options.map((opt, idx) => (
            <option key={opt.id || opt.value || idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Spinner positioned inside select box on the right */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Empty data feedback message */}
      {isEmpty && !isLoading && options.length === 0 && (
        <p className="text-xs text-muted flex items-center gap-1">
          <FiInfo className="w-3 h-3 shrink-0" />
          No {label.toLowerCase()} available
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <FiAlertCircle className="w-3 h-3 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}
