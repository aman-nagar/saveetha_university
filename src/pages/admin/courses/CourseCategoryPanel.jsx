// src/pages/admin/courses/CourseCategoryPanel.jsx
import React, { useEffect, useState } from "react";
import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import { fetchCourseCategory, addCourseCategory } from "../../../api/courseApi";
import Toast from "../../../components/ui/Toast";
import Table from "../../../components/admin/courses/Table";

export default function CourseCategoryPanel() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState(null);

  // Load categories
  const loadCategories = async () => {
    const data = await fetchCourseCategory();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Submit handler
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("type", "course_type");
      data.append("name", formData.category);

      const res = await addCourseCategory(data);

      console.log("POST result:", res);

      if (res?.status) {
        setToast({
          type: "success",
          message: "Category added successfully",
        });

        await loadCategories();
      } else {
        throw new Error("API returned failure");
      }
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Failed to add category",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    try {
      const data = new FormData();
      data.append("type", "course_type");
      data.append("id", row.id);
      data.append("action", "delete");

      await addCourseCategory(data); // same endpoint

      setToast({
        type: "success",
        message: "Category deleted",
      });

      loadCategories();
    } catch (err) {
      setToast({
        type: "error",
        message: "Delete failed",
      });
    }
  };

  const actions = [
    {
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm",
      onClick: handleDelete,
    },
  ];

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Category Name" },
    { key: "created_at", label: "Created At" },
  ];

  return (
    <div className="w-full space-y-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Form */}
      <CourseCategoryForm onSubmit={handleSubmit} loading={loading} />

      {/* Table */}
      <Table
        title="Course Categories"
        columns={columns}
        data={categories}
        actions={actions}
      />
    </div>
  );
}
