// src/pages/admin/courses/StreamPanel.jsx
import { useEffect, useState } from "react";
import { fetchAllCourses } from "../../../api/courseApi";
import {
  fetchStreams,
  createStream,
  deleteStream,
} from "../../../api/streamApi";

import StreamForm from "../../../components/admin/courses/StreamForm";
import Table from "../../../components/table/Table";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";

export default function StreamPanel() {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchAllCourses();
      setCourseList(data);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const loadStreams = async (courseId) => {
    setLoading(true);
    try {
      const data = await fetchStreams(courseId);
      setStreams(data);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    if (value) {
      loadStreams(value);
    } else {
      setStreams([]);
    }
  };

  const handleCreate = async (streamData) => {
    try {
      await createStream(streamData.courseId, streamData.name);
      setToast({ type: "success", message: "Stream created" });
      loadStreams(streamData.courseId);
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const original = [...streams];
    setStreams((prev) => prev.filter((s) => s.id !== deleteTarget.id));

    try {
      await deleteStream(deleteTarget.id);
      setToast({ type: "success", message: "Stream deleted" });
    } catch (err) {
      setStreams(original);
      setToast({ type: "error", message: err.message });
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
      label: "Stream Name",
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

      <StreamForm
        courseList={courseList}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
        onSubmit={handleCreate}
      />

      <Table
        title="Stream List"
        columns={columns}
        data={streams}
        actions={actions}
        loading={loading}
        emptyMessage="No streams found"
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
