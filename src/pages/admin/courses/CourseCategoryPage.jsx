// src/pages/admin/courses/CourseCategoryPage.jsx

import { useEffect, useState } from "react";
import {
  fetchCourseCategories,
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from "../../../api/courseTypeApi";

import { useCrud } from "../../../hooks/useCrud";
import { useToast } from "../../../hooks/useToast";
import { useConfirm } from "../../../hooks/useConfirm";

import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function CourseCategoryPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [editData, setEditData] = useState(null);

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

  // CREATE
  const handleCreate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name) return;

    try {
      await createCourseCategory(name);
      show("success", `Category "${name}" created`);
      load();
    } catch (err) {
      show("error", err.message);
    }
  };

  // UPDATE
  const handleUpdate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name || !editData) return;

    try {
      await updateCourseCategory(editData.id, name);
      show("success", `Category updated successfully`);
      setEditData(null);
      load();
    } catch (err) {
      show("error", err.message);
    }
  };

  // DELETE
  const confirmDelete = async () => {
    if (!target) return;

    try {
      await remove(target.id);
      show("success", `Category "${target.name}" deleted`);
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    { key: "name", label: "Category Name" },
  ];

  const actions = [
    {
      icon: "✏️",
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => setEditData(row),
    },
    {
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      onClick: open,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* CREATE FORM */}
      <CourseCategoryForm
        onSubmit={handleCreate}
        loading={loading}
        mode="create"
      />

      {/* TABLE */}
      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
        loading={loading}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Course Category"
        onClose={() => setEditData(null)}
      >
        <CourseCategoryForm
          onSubmit={handleUpdate}
          initialData={editData}
          mode="edit"
          onCancel={() => setEditData(null)}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        footer={
          <>
            <button onClick={close} className="px-4 py-2 border rounded">
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
        {target && (
          <p>
            Delete "<strong>{target.name}</strong>"?
          </p>
        )}
      </Modal>
    </div>
  );
}
