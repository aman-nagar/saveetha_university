// src/pages/admin/courses/CoursePanel.jsx

import { useEffect, useState } from "react";
import { fetchAllFaculty } from "../../../api/facultyApi";
import {
  fetchCourses,
  createCourse,
  deleteCourse,
} from "../../../api/courseApi";

import { useCrud } from "../../../hooks/useCrud";

import CourseForm from "../../../components/admin/courses/CourseForm";
import Table from "../../../components/table/Table";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";

export default function CoursePanel() {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const {
    data: courses,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchCourses,
    deleteFn: deleteCourse,
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data = await fetchAllFaculty();
      setFacultyList(data);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    if (value) load(value);
  };

  const handleCreate = async (courseData) => {
    try {
      await createCourse(courseData);
      setToast({ type: "success", message: "Course created" });
      load(courseData.facultyId);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await remove(deleteTarget.id);
      setToast({ type: "success", message: "Course deleted" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "serial", label: "#", render: (_, index) => index + 1 },
    { key: "name", label: "Course Name" },
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
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <CourseForm
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        onFacultyChange={handleFacultyChange}
        onSubmit={handleCreate}
      />

      <Table
        title="Course List"
        columns={columns}
        data={courses}
        actions={actions}
        loading={loading}
        emptyMessage="No courses found"
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
