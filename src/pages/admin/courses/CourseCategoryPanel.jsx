// src/pages/admin/courses/CourseCategoryPanel.jsx
import React, { useEffect, useState } from "react";
import {
  fetchCourseCategories,
  createCourseCategory,
  deleteCourseCategory,
} from "../../../api/courseTypeApi";
import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function CourseCategoryPanel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCourseCategories();
      setCategories(data);
      console.log(`courseCategoryPanel loadcategories ${data}`);
    } catch (err) {
      setToast({
        type: "error",
        message: `Failed to load categories: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name) return;

    setLoading(true);
    try {
      await createCourseCategory(name);
      setToast({ type: "success", message: `Category "${name}" created` });
      await loadCategories();
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to create category",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (row) => {
    setDeleteTarget(row);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const originalCategories = [...categories];

    // optimistic update
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));

    try {
      await deleteCourseCategory(deleteTarget.id);

      setToast({
        type: "success",
        message: `Category "${deleteTarget.name}" deleted successfully`,
      });

      await loadCategories();
    } catch (err) {
      // rollback
      setCategories(originalCategories);

      setToast({
        type: "error",
        message: err.message || "Failed to delete category",
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, index) => index + 1,
    },
    {
      key: "name",
      label: "Category Name",
    },
  ];

  const actions = [
    {
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm font-medium transition",
      onClick: handleDeleteClick,
    },
  ];

  return (
    <div className="w-full space-y-8 p-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <CourseCategoryForm onSubmit={handleCreate} loading={loading} />

      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
      />

      <Modal
        isOpen={!!deleteTarget}
        title="Confirm Delete"
        onClose={() => setDeleteTarget(null)}
        footer={
          <>
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded border border-border text-muted hover:bg-bg"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        {deleteTarget && (
          <p>
            Are you sure you want to delete "
            <strong>{deleteTarget.name}</strong>"?
            <br />
            This action cannot be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
