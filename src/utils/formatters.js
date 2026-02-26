// src/utils/formatters.js
export const generateDurationList = (count, type) => {
  if (type === "Month") return [{ label: `${count} Months`, value: count }];
  return Array.from({ length: count }, (_, i) => ({
    label: `${type} ${i + 1}`,
    value: i + 1,
  }));
};
