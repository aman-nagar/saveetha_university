// src/pages/admin/courses/CourseCategoryPanel.jsx
import { useState } from "react";
import CourseCategoryForm from "../../../components/admin/courses/CourseCategoryForm";
import Table from "../../../components/admin//courses/Table";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CourseCategoryPanel() {
  const [loading, setLoading] = useState(false);

  // temporary static data
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Education Courses",
      eligibility: "Graduation",
      duration: "2 Years",
    },
  ]);

  const handleSubmit = async (formData) => {
    setLoading(true);

    const newItem = {
      id: Date.now(),
      title: formData.category,
      eligibility: "—",
      duration: "—",
    };

    setCategories((prev) => [...prev, newItem]);

    setLoading(false);
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "title", label: "Title" },
    { key: "eligibility", label: "Eligibility" },
    { key: "duration", label: "Duration" },
  ];

  const actions = [
    {
      icon: <FaEdit />,
      className: "bg-blue-500 text-white px-3 py-1 rounded hover:opacity-90",
      onClick: (row) => console.log("Edit", row),
    },
    {
      icon: <FaTrash />,
      className: "bg-red-500 text-white px-3 py-1 rounded hover:opacity-90",
      onClick: (row) => console.log("Delete", row),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <CourseCategoryForm onSubmit={handleSubmit} loading={loading} />

      <Table columns={columns} data={categories} actions={actions} />
    </div>
  );
}
