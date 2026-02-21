// src/pages/admin/courses/StreamPage.jsx

import { useEffect, useState } from "react";
import { fetchAllCourses } from "../../../api/courseApi";
import {
  fetchStreams,
  createStream,
  deleteStream,
} from "../../../api/streamApi";

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
    fetchStreams(2).then((res) => {
      console.log("Streams raw:", res);
    });
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

    if (value) {
      load(value);
    }
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
      icon: "🗑",
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      onClick: open,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

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
