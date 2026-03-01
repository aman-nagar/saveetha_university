// src/utils/formatters.js

/**
 * Generates a consistent list of academic durations (Years, Semesters, Months)
 * @param {number} count - The total duration (e.g., 3)
 * @param {string} type - The type (e.g., "Year", "Semester", "Month")
 * @returns {Array} - [{ label: "Year 1", value: "1" }, ...]
 */
export const generateDurationOptions = (count, type) => {
  const numCount = Number(count);
  const normalizedType = type?.toLowerCase();

  // Handle Months (Usually a single selection for the whole duration)
  if (normalizedType === "month") {
    return [{ label: `${numCount} Months`, value: String(numCount) }];
  }

  // Handle Years and Semesters (Breakdown into parts)
  const labelPrefix = type.charAt(0).toUpperCase() + type.slice(1);
  return Array.from({ length: numCount }, (_, i) => ({
    label: `${labelPrefix} ${i + 1}`,
    value: String(i + 1),
  }));
};
