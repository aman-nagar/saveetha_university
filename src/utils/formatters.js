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

export const formatTimeAMPM = (input) => {
  if (!input) return "—";

  let date;

  // If input is just time (e.g., "14:30:00"), attach dummy date
  if (
    typeof input === "string" &&
    input.includes(":") &&
    !input.includes("T")
  ) {
    date = new Date(`1970-01-01T${input}`);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatExamDate = (input) => {
  if (!input) return "—";

  const date = new Date(input);

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatOrdinal = (number) => {
  // Convert to an integer in case it comes from the API as a string ("1")
  const n = parseInt(number, 10);

  // If it's not a number (e.g., "Final"), just return the text as-is
  if (isNaN(n)) return number;

  const remainder10 = n % 10;
  const remainder100 = n % 100;

  // Handle exceptions like 11th, 12th, 13th
  if (remainder10 === 1 && remainder100 !== 11) {
    return n + "st";
  }
  if (remainder10 === 2 && remainder100 !== 12) {
    return n + "nd";
  }
  if (remainder10 === 3 && remainder100 !== 13) {
    return n + "rd";
  }

  // Default to "th" for everything else (4th, 5th, 11th, etc.)
  return n + "th";
};

export const formatRoman = (number) => {
  const n = parseInt(number, 10);
  if (isNaN(n) || n <= 0) return number;

  const romanMap = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
  };

  const roman = romanMap[n] || n;

  let suffix = "th";
  if (n % 10 === 1 && n % 100 !== 11) suffix = "st";
  else if (n % 10 === 2 && n % 100 !== 12) suffix = "nd";
  else if (n % 10 === 3 && n % 100 !== 13) suffix = "rd";

  // Return with space and superscript
  return `${roman} <sup>${suffix}</sup>`;
};
