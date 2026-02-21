// src/pages/admin/courses/CourseCategoryPanel.jsx

import { useEffect, useState } from "react";
import {
  fetchCourseCategories,
  createCourseCategory,
  deleteCourseCategory,
} from "../../../api/courseTypeApi";

import { useCrud } from "../../../hooks/useCrud";

import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function CourseCategoryPanel() {
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    data: categories,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchCourseCategories,
    deleteFn: deleteCourseCategory,
  });

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name) return;

    try {
      await createCourseCategory(name);
      setToast({ type: "success", message: `Category "${name}" created` });
      load();
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to create category",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await remove(deleteTarget.id);
      setToast({
        type: "success",
        message: `Category "${deleteTarget.name}" deleted`,
      });
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to delete category",
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "serial", label: "#", render: (_, index) => index + 1 },
    { key: "name", label: "Category Name" },
  ];

  const actions = [
    {
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm font-medium",
      onClick: (row) => setDeleteTarget(row),
    },
  ];

  return (
    <div className="w-full space-y-8 p-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <CourseCategoryForm onSubmit={handleCreate} loading={loading} />

      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
        loading={loading}
      />

      <Modal
        isOpen={!!deleteTarget}
        title="Confirm Delete"
        onClose={() => setDeleteTarget(null)}
        footer={
          <>
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </>
        }
      >
        {deleteTarget && (
          <p>
            Delete "<strong>{deleteTarget.name}</strong>"?
          </p>
        )}
      </Modal>
    </div>
  );
}
