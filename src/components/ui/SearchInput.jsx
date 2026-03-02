// src/components/ui/SearchInput.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * Reusable Search Input
 *
 * Props:
 * - value (string) → controlled value (optional)
 * - onChange (function) → called immediately
 * - onDebounce (function) → called after delay
 * - placeholder (string)
 * - delay (number) → debounce delay (default 500ms)
 * - className (string) → extra wrapper styles
 * - inputClassName (string) → extra input styles
 */
export default function SearchInput({
  value,
  onChange,
  onDebounce,
  placeholder = "Search...",
  delay = 500,
  className = "",
  inputClassName = "",
}) {
  const [internalValue, setInternalValue] = useState(value || "");
  const isInitialMount = useRef(true);

  // Keep internal state synced if controlled externally
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Debounce logic - skip on initial mount
  useEffect(() => {
    if (!onDebounce) return;

    // Skip debounce on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onDebounce(internalValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [internalValue, delay, onDebounce]);

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;

      if (value === undefined) {
        setInternalValue(val);
      } else {
        setInternalValue(val);
      }

      if (onChange) {
        onChange(val);
      }
    },
    [value, onChange],
  );

  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none" />
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text w-full focus:outline-none focus:ring-2 focus:ring-primary/40 ${inputClassName}`}
      />
    </div>
  );
}
