// src/pages/admin/courses/SubjectPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import { fetchFaculty } from "../../../api/courses/facultyApi";
import { fetchCourses } from "../../../api/courses/courseApi";
import { fetchStreams, fetchAllStreams } from "../../../api/courses/streamApi";
import {
  fetchSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  toggleUpdateStatus,
} from "../../../api/courses/subjectApi";

import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../context/ToastContext";

import SubjectForm from "../../../components/admin/courses/SubjectForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";
import StatusToggle from "../../../components/ui/StatusToggle";
import { updateListState } from "../../../utils/formHelpers";

export default function SubjectPage() {
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
  const [loadingStreams, setLoadingStreams] = useState(false);
  const [streamList, setStreamList] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [editData, setEditData] = useState(null);

  const {
    data: subjects,
    loading,
    load,
    remove,
    setData,
  } = useCrud({
    fetchFn: fetchSubjects,
    deleteFn: deleteSubject,
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
    setStreamList([]);
    setSelectedStream("");

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
    setStreamList([]);
    setSelectedStream("");

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

  // Load streams when course is selected
  const handleCourseChange = async (value) => {
    setSelectedCourse(value);
    setStreamList([]);
    setSelectedStream("");

    if (value && !editData) {
      setLoadingStreams(true);
      try {
        const data = await fetchStreams(value);
        setStreamList(data);
      } catch (err) {
        show("error", err.message);
      } finally {
        setLoadingStreams(false);
      }
    }
  };

  const handleStreamChange = (value) => {
    setSelectedStream(value);
    if (value && !editData) load(value);
  };

  // In edit mode, cascade load: course type -> faculties -> courses -> streams
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

        // Then load streams for selected course
        setLoadingStreams(true);
        try {
          const streams = await fetchStreams(row.course_id);
          setStreamList(streams);
          setSelectedStream(row.stream_id);
        } finally {
          setLoadingStreams(false);
        }
      } finally {
        setLoadingCourses(false);
      }
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoadingFaculties(false);
    }
  };

  const handleCreate = async (data) => {
    console.log(data);
    try {
      await createSubject(data);
      show("success", "Subject created");
      load();
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateSubject(data);
      show("success", "Subject updated");
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
      show("success", "Subject deleted");
      load();
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };
  const handleStatusToggle = async (id, currentStatus) => {
    const originalData = [...subjects];
    const newStatus = currentStatus == 1 ? 0 : 1;
    setData(updateListState(id, { status: newStatus }));
    try {
      await toggleUpdateStatus({ id, status: newStatus });
      show("success", "Status updated instantly");
    } catch (error) {
      setData(originalData);
      show("error", error.message || "Failed to update status");
    }
  };

  const filteredSubjects = selectedStream
    ? subjects.filter((s) => String(s.stream_id) === String(selectedStream))
    : [];

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },

    { key: "subject_name", label: "Subject Name" },
    { key: "subject_code", label: "Code" },
    { key: "short_name", label: "Short Name" },

    {
      key: "stream_name",
      label: "Stream",
      render: (row) => (
        <span className="text-text font-medium">{row.stream_name || "—"}</span>
      ),
    },

    { key: "max_theory_marks", label: "Theory" },
    { key: "max_practical_marks", label: "Practical" },

    {
      key: "duration",
      label: "Duration",
      render: (row) =>
        row.duration ? `${row.duration} ${row.duration_type}` : "—",
    },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusToggle
          status={row.status}
          onToggle={() => handleStatusToggle(row.id, row.status)}
        />
      ),
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

      <SubjectForm
        courseTypes={courseTypes}
        selectedCourseType={selectedCourseType}
        onCourseTypeChange={handleCourseTypeChange}
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        onFacultyChange={handleFacultyChange}
        courseList={courseList}
        selectedCourse={selectedCourse}
        onCourseChange={handleCourseChange}
        streamList={streamList}
        selectedStream={selectedStream}
        onStreamChange={handleStreamChange}
        onSubmit={handleCreate}
        mode="create"
        loadingFaculties={loadingFaculties}
        loadingCourses={loadingCourses}
        loadingStreams={loadingStreams}
        isEmptyFaculties={facultyList.length === 0 && !loadingFaculties}
        isEmptyCourses={courseList.length === 0 && !loadingCourses}
        isEmptyStreams={streamList.length === 0 && !loadingStreams}
      />

      <Table
        title="Subject List"
        columns={columns}
        data={filteredSubjects}
        actions={actions}
        loading={loading}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Subject"
        onClose={() => setEditData(null)}
      >
        <SubjectForm
          courseTypes={courseTypes}
          selectedCourseType={selectedCourseType}
          onCourseTypeChange={handleCourseTypeChange}
          facultyList={facultyList}
          selectedFaculty={selectedFaculty}
          onFacultyChange={handleFacultyChange}
          courseList={courseList}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
          streamList={streamList}
          selectedStream={selectedStream}
          onStreamChange={handleStreamChange}
          onSubmit={handleUpdate}
          initialData={editData}
          mode="edit"
          onCancel={() => setEditData(null)}
          loadingFaculties={loadingFaculties}
          loadingCourses={loadingCourses}
          loadingStreams={loadingStreams}
          isEmptyFaculties={facultyList.length === 0 && !loadingFaculties}
          isEmptyCourses={courseList.length === 0 && !loadingCourses}
          isEmptyStreams={streamList.length === 0 && !loadingStreams}
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
            Delete "<strong>{target.subject_name}</strong>"?
          </p>
        )}
      </Modal>
    </div>
  );
}
