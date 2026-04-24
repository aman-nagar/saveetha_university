// src/pages/admin/courses/StreamPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import { fetchFaculty, fetchAllFaculty } from "../../../api/courses/facultyApi";
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
  const [allFaculties, setAllFaculties] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
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
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [typesData, facultiesData, coursesData] = await Promise.all([
        fetchCourseCategories(),
        fetchAllFaculty(),
        fetchAllCourses(),
      ]);

      setCourseTypes(typesData);
      setAllFaculties(facultiesData);
      setAllCourses(coursesData);
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

  // In edit mode, resolve parent IDs first so the modal opens fully hydrated.
  const handleEditClick = async (row) => {
    try {
      let facultiesSource = allFaculties;
      let coursesSource = allCourses;

      if (facultiesSource.length === 0 || coursesSource.length === 0) {
        const [facultiesData, coursesData] = await Promise.all([
          fetchAllFaculty(),
          fetchAllCourses(),
        ]);
        facultiesSource = facultiesData;
        coursesSource = coursesData;
        setAllFaculties(facultiesData);
        setAllCourses(coursesData);
      }

      const courseId = row.course_id || selectedCourse;
      const matchedCourse = coursesSource.find(
        (course) => String(course.id) === String(courseId),
      );
      const facultyId = row.faculty_id || matchedCourse?.faculty_id;
      const matchedFaculty = facultiesSource.find(
        (faculty) => String(faculty.id) === String(facultyId),
      );
      const courseTypeId = row.course_type_id || matchedFaculty?.course_type_id;

      if (!courseId) {
        throw new Error("Could not resolve the course for this stream.");
      }
      if (!facultyId) {
        throw new Error("Could not resolve the faculty for this stream.");
      }
      if (!courseTypeId) {
        throw new Error("Could not resolve the course type for this stream.");
      }

      setSelectedCourseType(courseTypeId);
      setSelectedFaculty(facultyId);
      setSelectedCourse(courseId);

      setFacultyList(
        facultiesSource.filter(
          (faculty) =>
            String(faculty.course_type_id) === String(courseTypeId),
        ),
      );
      setCourseList(
        coursesSource.filter(
          (course) => String(course.faculty_id) === String(facultyId),
        ),
      );

      setEditData({
        ...row,
        course_id: courseId,
        faculty_id: facultyId,
        course_type_id: courseTypeId,
      });
    } catch (err) {
      show("error", err.message);
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
      load(streamData.courseId || editData.course_id);
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
  allCourses.forEach((c) => {
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
        {editData && (
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
        )}
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
