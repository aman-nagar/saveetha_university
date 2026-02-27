export const updateListState = (id, updates) => (prevList) =>
  prevList.map((item) => (item.id === id ? { ...item, ...updates } : item));
