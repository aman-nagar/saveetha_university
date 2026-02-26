// src/components/form/FormSelect.jsx
import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiAlertCircle, FiCheck } from "react-icons/fi";

export default function FormSelect({
  label,
  name,
  register,
  options = [],
  required,
  error,
  onChangeCb,
  placeholder = "Select",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef(null);
  
  const { onChange, ref, ...rest } = register(name, { required });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setSelectedLabel(option.label);
    setIsOpen(false);
    if (onChangeCb) onChangeCb(option);
  };

  return (
    <div className="space-y-1.5 sm:space-y-2" ref={dropdownRef}>
      <label className="text-xs sm:text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* Custom Dropdown */}
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-left text-sm sm:text-base
            flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200
            ${error ? "border-danger ring-1 ring-danger/30" : "border-border hover:border-muted/50"}
            ${isOpen ? "ring-2 ring-accent/40 border-accent" : ""}
          `}
        >
          <span className={selectedLabel ? "text-text" : "text-muted/60"}>
            {selectedLabel || placeholder}
          </span>
          <FiChevronDown 
            className={`w-4 h-4 sm:w-5 sm:h-5 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Hidden native input for form registration */}
        <input type="hidden" name={name} ref={ref} {...rest} />

        {/* Dropdown Menu - Portal-like positioning */}
        {isOpen && (
          <div className="
            absolute z-50 w-full mt-1 
            bg-surface border border-border rounded-lg shadow-lg
            max-h-60 overflow-auto
            animate-in fade-in slide-in-from-top-2 duration-200
          ">
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: "" } });
                  setSelectedLabel("");
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-muted hover:bg-bg transition-colors"
              >
                {placeholder}
              </button>
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`
                    w-full px-3 py-2 text-left text-sm flex items-center justify-between
                    hover:bg-bg transition-colors
                    ${selectedLabel === opt.label ? "bg-accent/10 text-accent" : "text-text"}
                  `}
                >
                  {opt.label}
                  {selectedLabel === opt.label && <FiCheck className="w-4 h-4" />}
                </button>
              ))}
            </div>
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