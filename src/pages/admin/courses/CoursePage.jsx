// src/pages/admin/courses/CoursePage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchAllFaculty } from "../../../api/courses/facultyApi";
import {
  fetchCourses,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../../../api/courses/courseApi";

import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../hooks/useToast";

import CourseForm from "../../../components/admin/courses/CourseForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function CoursePage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [editData, setEditData] = useState(null);

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
      show("error", err.message);
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    if (value && !editData) load(value);
  };

  const handleCreate = async (courseData) => {
    try {
      await createCourse(courseData);
      show("success", "Course created");
      load(courseData.facultyId);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (courseData) => {
    if (!editData) return;

    try {
      await updateCourse({
        id: editData.id,
        facultyId: courseData.facultyId,
        name: courseData.name,
        duration: courseData.duration,
        durationType: courseData.durationType,
      });

      show("success", "Course updated");
      setEditData(null);
      load(courseData.facultyId);
    } catch (err) {
      show("error", err.message);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;

    try {
      await remove(target.id);
      show("success", "Course deleted");
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const facultyMap = {};
  facultyList.forEach((f) => {
    facultyMap[f.id] = f.name;
  });

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    {
      key: "faculty",
      label: "Faculty",
      render: (row) => facultyMap[row.faculty_id] || "—",
    },
    { key: "name", label: "Course Name" },
    {
      key: "duration",
      label: "Duration",
      render: (row) =>
        row.duration ? `${row.duration} ${row.duration_type}` : "—",
    },
  ];

  const actions = [
    {
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => {
        setEditData(row);
        setSelectedFaculty(row.faculty_id);
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
    <div className="space-y-8 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

      <CourseForm
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        onFacultyChange={handleFacultyChange}
        onSubmit={handleCreate}
        mode="create"
      />

      <Table
        title="Course List"
        columns={columns}
        data={courses}
        actions={actions}
        loading={loading}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Course"
        onClose={() => setEditData(null)}
      >
        <CourseForm
          facultyList={facultyList}
          selectedFaculty={selectedFaculty}
          onFacultyChange={handleFacultyChange}
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
