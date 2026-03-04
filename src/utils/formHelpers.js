// src/utils/formHelpers.js
export const updateListState = (id, updates) => (prevList) =>
  prevList.map((item) => (item.id === id ? { ...item, ...updates } : item));

export const getTodayDate = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};
