// src/pages/admin/courses/CourseCategoryPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import {
  fetchCourseCategories,
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from "../../../api/courses/courseTypeApi";

import { useCrud } from "../../../hooks/useCrud";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../hooks/useConfirm";

import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import CourseCategoryImport from "../../../components/admin/courses/CourseCategoryImport";
import MasterAcademicImport from "../../../components/admin/courses/MasterAcademicImport"; // ✅ NEW
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

  const handleCreate = async (nameOrForm) => {
    const name = (
      typeof nameOrForm === "string" ? nameOrForm : nameOrForm.category
    )?.trim();
    if (!name) return;

    try {
      await createCourseCategory(name);
      if (typeof nameOrForm !== "string") {
        show("success", `Category "${name}" created`);
        load();
      }
    } catch (err) {
      if (typeof nameOrForm !== "string") show("error", err.message);
      throw err;
    }
  };

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
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => setEditData(row),
    },
    {
      icon: <FaTrash />,
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      onClick: open,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* 1. MASTER HIERARCHY IMPORT (FULL SYSTEM) */}
      <MasterAcademicImport
        showToast={show}
        onComplete={load} // Refresh categories when done
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 2. MANUAL CREATE FORM (SINGLE CATEGORY) */}
        <CourseCategoryForm
          onSubmit={handleCreate}
          loading={loading}
          mode="create"
        />
        {/* 3. EXCEL IMPORT BOX (CATEGORY ONLY) */}
        <CourseCategoryImport
          onImportComplete={handleCreate}
          showToast={show}
          existingData={categories}
        />
      </div>

      {/* 4. DATA TABLE */}
      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
        loading={loading}
      />

      {/* MODALS */}
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

      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        footer={
          <div className="flex gap-2">
            <button
              onClick={close}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-bg"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-danger text-white rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
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
