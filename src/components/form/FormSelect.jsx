// src/components/form/FormSelect.jsx
import { FiAlertCircle } from "react-icons/fi";

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
  isLoading = false, // NEW: shows loading spinner and disables select
}) {
  const { onChange, ...rest } = register(name, { required });

  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-medium text-text">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        {/* Loading spinner indicator */}
        {isLoading && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-muted">Loading...</span>
          </div>
        )}
      </div>

      <select
        {...rest}
        disabled={disabled || isLoading}
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
          ${disabled || isLoading ? "cursor-not-allowed opacity-70" : ""}
        `}
      >
        <option key="__empty__" value="">
          {placeholder}
        </option>
        {options.map((opt, idx) => (
          <option key={opt.id || opt.value || idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <FiAlertCircle className="w-3 h-3 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}
