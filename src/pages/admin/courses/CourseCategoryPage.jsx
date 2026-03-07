// src/pages/admin/courses/CourseCategoryPage.jsx
import { useEffect, useState } from "react";
import { FaFileExport, FaPen, FaTrash } from "react-icons/fa";
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
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";
import MasterAcademicImport from "../../../components/admin/courses/import-export/MasterAcademicImport";
import { handleExport } from "../../../utils/exportCourse";
import Button from "../../../components/ui/Button";

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

  const handleCreate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name) return;
    try {
      await createCourseCategory(name);
      show("success", `Category created`);
      load();
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (formValues) => {
    const name = formValues.category?.trim();
    if (!name || !editData) return;
    try {
      await updateCourseCategory(editData.id, name);
      show("success", `Updated successfully`);
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
      show("success", `Deleted`);
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

      {/* 1. MASTER IMPORT (The only import you need) */}
      <MasterAcademicImport showToast={show} onComplete={load} />
      <Button onClick={() => handleExport(categories)}>
        <FaFileExport /> Export Categories to Excel
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 2. MANUAL ADD (1/3 Width) */}
        <div className="lg:col-span-1">
          <CourseCategoryForm
            onSubmit={handleCreate}
            loading={loading}
            mode="create"
          />
        </div>

        {/* 3. CATEGORY LIST (2/3 Width) */}
        <div className="lg:col-span-2">
          <Table
            title="Course Categories"
            columns={columns}
            data={categories}
            actions={actions}
            loading={loading}
          />
        </div>
      </div>

      {/* MODALS */}
      <Modal
        isOpen={!!editData}
        title="Edit Category"
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
            <Button onClick={close}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
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
