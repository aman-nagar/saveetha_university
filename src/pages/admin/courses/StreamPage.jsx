// src/pages/admin/courses/StreamPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchAllCourses } from "../../../api/courses/courseApi";
import {
  fetchStreams,
  createStream,
  deleteStream,
  updateStream,
} from "../../../api/courses//streamApi";

import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../hooks/useToast";

import StreamForm from "../../../components/admin/courses/StreamForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function StreamPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editData, setEditData] = useState(null);

  const {
    data: streams,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchStreams,
    deleteFn: deleteStream,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchAllCourses();
      setCourseList(data);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    if (value && !editData) load(value);
  };

  const handleCreate = async (streamData) => {
    try {
      await createStream(streamData.courseId, streamData.name);
      show("success", "Stream created");
      load(streamData.courseId);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (streamData) => {
    if (!editData) return;

    try {
      await updateStream(editData.id, streamData.name, streamData.courseId);

      show("success", "Stream updated");
      setEditData(null);
      load(streamData.courseId);
    } catch (err) {
      show("error", err.message);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;

    try {
      await remove(target.id);
      show("success", "Stream deleted");
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const courseMap = {};
  courseList.forEach((c) => {
    courseMap[c.id] = c.name;
  });

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    {
      key: "course",
      label: "Course",
      render: (row) => courseMap[row.course_id] || "—",
    },
    { key: "name", label: "Stream Name" },
  ];

  const actions = [
    {
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => {
        setEditData(row);
        setSelectedCourse(row.course_id);
      },
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

      <StreamForm
        courseList={courseList}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
        onSubmit={handleCreate}
        mode="create"
      />

      <Table
        title="Stream List"
        columns={columns}
        data={streams}
        actions={actions}
        loading={loading}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Stream"
        onClose={() => setEditData(null)}
      >
        <StreamForm
          courseList={courseList}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
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
            <button onClick={close} className="px-4 py-2 border border-border rounded-lg text-sm text-text hover:bg-bg transition">
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-danger text-white rounded-lg text-sm hover:bg-danger/90 transition"
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
