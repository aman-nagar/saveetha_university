// src/pages/admin/courses/FacultyPanel.jsx
import React, { useEffect, useState } from "react";
import { fetchCourseCategories } from "../../../api/courseTypeApi";
import {
  fetchFaculty,
  createFaculty,
  deleteFaculty,
} from "../../../api/facultyApi";
import FacultyForm from "../../../components/admin/courses/FacultyForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function FacultyPanel() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourseTypes();
  }, []);

  const loadCourseTypes = async () => {
    try {
      const data = await fetchCourseCategories();
      setCourseTypes(data);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const loadFaculty = async (courseTypeId) => {
    setLoading(true);
    try {
      const data = await fetchFaculty(courseTypeId);
      setFacultyList(data);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (value) => {
    setSelectedCourseType(value);
    if (value) {
      loadFaculty(value);
    } else {
      setFacultyList([]);
    }
  };

  const handleCreateFaculty = async (name) => {
    if (!selectedCourseType) {
      setToast({
        type: "warning",
        message: "Please select a course type first",
      });
      return;
    }

    try {
      await createFaculty(selectedCourseType, name);
      setToast({ type: "success", message: "Faculty created" });
      loadFaculty(selectedCourseType);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const original = [...facultyList];

    setFacultyList((prev) => prev.filter((f) => f.id !== deleteTarget.id));

    try {
      await deleteFaculty(deleteTarget.id);
      setToast({
        type: "success",
        message: "Faculty deleted successfully",
      });
    } catch (err) {
      setFacultyList(original);
      setToast({
        type: "error",
        message: err.message,
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
      label: "Faculty Name",
    },
  ];
  const actions = [
    {
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      onClick: (row) => setDeleteTarget(row),
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <FacultyForm
        courseTypes={courseTypes}
        selectedCourseType={selectedCourseType}
        onCourseChange={handleCourseChange}
        onSubmit={handleCreateFaculty}
      />

      <Table
        title="Faculty List"
        columns={columns}
        data={facultyList}
        actions={actions}
        loading={loading}
        emptyMessage="No faculty found"
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
