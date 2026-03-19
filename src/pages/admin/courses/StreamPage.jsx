// src/pages/admin/courses/StreamPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import { fetchFaculty } from "../../../api/courses/facultyApi";
import { fetchCourses, fetchAllCourses } from "../../../api/courses/courseApi";
import {
  fetchStreams,
  createStream,
  deleteStream,
  updateStream,
} from "../../../api/courses//streamApi";

import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../context/ToastContext";

import StreamForm from "../../../components/admin/courses/StreamForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function StreamPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [courseTypes, setCourseTypes] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [loadingFaculties, setLoadingFaculties] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);
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
    loadCourseTypes();
  }, []);

  const loadCourseTypes = async () => {
    try {
      const data = await fetchCourseCategories();
      setCourseTypes(data);
    } catch (err) {
      show("error", err.message);
    }
  };

  // Load faculties when course type is selected
  const handleCourseTypeChange = async (value) => {
    setSelectedCourseType(value);
    setFacultyList([]);
    setSelectedFaculty("");
    setCourseList([]);
    setSelectedCourse("");

    if (value && !editData) {
      setLoadingFaculties(true);
      try {
        const data = await fetchFaculty(value);
        setFacultyList(data);
      } catch (err) {
        show("error", err.message);
      } finally {
        setLoadingFaculties(false);
      }
    }
  };

  // Load courses when faculty is selected
  const handleFacultyChange = async (value) => {
    setSelectedFaculty(value);
    setCourseList([]);
    setSelectedCourse("");

    if (value && !editData) {
      setLoadingCourses(true);
      try {
        const data = await fetchCourses(value);
        setCourseList(data);
      } catch (err) {
        show("error", err.message);
      } finally {
        setLoadingCourses(false);
      }
    }
  };

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    if (value && !editData) load(value);
  };

  // In edit mode, cascade load: course type -> faculties -> courses
  const handleEditClick = async (row) => {
    setEditData(row);
    // First set course type to load its faculties
    setSelectedCourseType(row.course_type_id);
    setLoadingFaculties(true);
    try {
      const faculties = await fetchFaculty(row.course_type_id);
      setFacultyList(faculties);
      setSelectedFaculty(row.faculty_id);

      // Then load courses for selected faculty
      setLoadingCourses(true);
      try {
        const courses = await fetchCourses(row.faculty_id);
        setCourseList(courses);
        setSelectedCourse(row.course_id);
      } finally {
        setLoadingCourses(false);
      }
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoadingFaculties(false);
    }
  };

  const handleCreate = async (streamData) => {
    try {
      await createStream(
        streamData.courseId,
        streamData.name,
        streamData.applicationFee,
      );
      show("success", "Stream created");
      load(streamData.courseId);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (streamData) => {
    if (!editData) return;

    try {
      await updateStream(
        editData.id,
        streamData.name,
        streamData.courseId,
        streamData.applicationFee,
      );

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
    {
      key: "application_fee",
      label: "Stream Fee",
      render: (row) => (row.application_fee ? `₹${row.application_fee}` : "—"),
    },
  ];

  const actions = [
    {
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: handleEditClick,
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
        courseTypes={courseTypes}
        selectedCourseType={selectedCourseType}
        onCourseTypeChange={handleCourseTypeChange}
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        onFacultyChange={handleFacultyChange}
        courseList={courseList}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
        onSubmit={handleCreate}
        mode="create"
        loadingFaculties={loadingFaculties}
        loadingCourses={loadingCourses}
        isEmptyFaculties={facultyList.length === 0 && !loadingFaculties}
        isEmptyCourses={courseList.length === 0 && !loadingCourses}
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
          courseTypes={courseTypes}
          selectedCourseType={selectedCourseType}
          onCourseTypeChange={handleCourseTypeChange}
          facultyList={facultyList}
          selectedFaculty={selectedFaculty}
          onFacultyChange={handleFacultyChange}
          courseList={courseList}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
          onSubmit={handleUpdate}
          initialData={editData}
          mode="edit"
          onCancel={() => setEditData(null)}
          loadingFaculties={loadingFaculties}
          loadingCourses={loadingCourses}
          isEmptyFaculties={facultyList.length === 0 && !loadingFaculties}
          isEmptyCourses={courseList.length === 0 && !loadingCourses}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        footer={
          <>
            <button
              onClick={close}
              className="px-4 py-2 border border-border rounded-lg text-sm text-text hover:bg-bg transition"
            >
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
