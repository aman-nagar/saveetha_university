// src/hooks/useCrud.js

import { useState, useCallback } from "react";

export function useCrud({ fetchFn, deleteFn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Load data (optionally with parameter)
   */
  const load = useCallback(
    async (param) => {
      setLoading(true);
      try {
        const result = await fetchFn(param);
        setData(result || []);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn],
  );

  // Optimistic delete with rollback

  const remove = useCallback(
    async (id) => {
      const original = [...data];

      setData((prev) => prev.filter((item) => item.id !== id));

      try {
        await deleteFn(id);
      } catch (error) {
        // rollback
        setData(original);
        console.log(error);
        throw error;
      }
    },
    [data, deleteFn],
  );

  return {
    data,
    setData,
    loading,
    load,
    remove,
  };
}
