// src/pages/admin/courses/CourseCategoryPage.jsx

import { useEffect } from "react";
import {
  fetchCourseCategories,
  createCourseCategory,
  deleteCourseCategory,
} from "../../../api/courseTypeApi";

import { useCrud } from "../../../hooks/useCrud";

import { useToast } from "../../../hooks/useToast";

import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";
import { useConfirm } from "../../../hooks/useConfirm";

export default function CourseCategoryPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

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
    fetchCourseCategories(1).then((res) => {
      console.log("course category:", res);
    });
    load();
  }, [load]);

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
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      onClick: open,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

      <CourseCategoryForm onSubmit={handleCreate} loading={loading} />

      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
        loading={loading}
      />

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
