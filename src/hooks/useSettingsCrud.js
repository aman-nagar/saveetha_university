// src/hooks/useSettingsCrud.js
import { useState, useCallback } from "react";

/**
 * Reusable hook for CRUD operations on settings content
 * Used for: Testimonials, News, Sliders, etc.
 *
 * @param {Function} fetchFn - Fetch all items function
 * @param {Function} createFn - Create item function
 * @param {Function} updateFn - Update item function
 * @param {Function} deleteFn - Delete item function
 * @param {Function} onError - Error callback
 * @returns {Object} CRUD state and methods
 */
export function useSettingsCrud(
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  onError,
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load all items
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      const errorMsg = err.message || "Failed to load data";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, onError]);

  // Create new item
  const create = useCallback(
    async (itemData) => {
      try {
        setSaving(true);
        setError(null);
        const result = await createFn(itemData);
        await load(); // Refresh list
        return result;
      } catch (err) {
        const errorMsg = err.message || "Failed to create item";
        setError(errorMsg);
        onError?.(errorMsg);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [createFn, load, onError],
  );

  // Update existing item
  const update = useCallback(
    async (id, itemData) => {
      try {
        setSaving(true);
        setError(null);
        const result = await updateFn(id, itemData);
        await load(); // Refresh list
        return result;
      } catch (err) {
        const errorMsg = err.message || "Failed to update item";
        setError(errorMsg);
        onError?.(errorMsg);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [updateFn, load, onError],
  );

  // Delete item
  const remove = useCallback(
    async (id) => {
      try {
        setSaving(true);
        setError(null);
        await deleteFn(id);
        await load(); // Refresh list
      } catch (err) {
        const errorMsg = err.message || "Failed to delete item";
        setError(errorMsg);
        onError?.(errorMsg);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [deleteFn, load, onError],
  );

  return {
    data,
    loading,
    saving,
    error,
    load,
    create,
    update,
    remove,
  };
}
