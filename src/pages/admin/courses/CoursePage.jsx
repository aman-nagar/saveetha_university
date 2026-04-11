// src/pages/admin/courses/CoursePage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import { fetchAllFaculty } from "../../../api/courses/facultyApi";
import {
  fetchCourses,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../../../api/courses/courseApi";
import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../context/ToastContext";

import CourseForm from "../../../components/admin/courses/CourseForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function CoursePage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [courseTypes, setCourseTypes] = useState([]);
  const [allFaculties, setAllFaculties] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const [selectedCourseType, setSelectedCourseType] = useState("");
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
    const loadInitialData = async () => {
      try {
        const [typesData, facultiesData] = await Promise.all([
          fetchCourseCategories(),
          fetchAllFaculty(),
        ]);
        setCourseTypes(typesData);
        setAllFaculties(facultiesData);
      } catch (err) {
        show("error", "Failed to load initial data: " + err.message);
      }
    };
    loadInitialData();
  }, []);

  // Filter faculties locally instead of hitting the API every time
  const handleCourseTypeChange = (value) => {
    setSelectedCourseType(value);
    setSelectedFaculty(""); // Reset faculty

    if (value) {
      const filtered = allFaculties.filter(
        (f) => String(f.course_type_id) === String(value),
      );
      setFacultyList(filtered);
    } else {
      setFacultyList([]);
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    if (value && !editData) load(value);
  };

  const handleEditClick = (row) => {
    try {
      const parentFaculty = allFaculties.find(
        (f) => String(f.id) === String(row.faculty_id),
      );
      const cTypeId = row.course_type_id || parentFaculty?.course_type_id;

      if (!cTypeId)
        throw new Error("Could not find Course Type for this record.");

      // 2. Filter the dropdown list
      const filteredFaculties = allFaculties.filter(
        (f) => String(f.course_type_id) === String(cTypeId),
      );
      setFacultyList(filteredFaculties);

      // 3. Set standard states
      setSelectedCourseType(cTypeId);
      setSelectedFaculty(row.faculty_id);

      // 4. Pass merged data to the form
      setEditData({ ...row, course_type_id: cTypeId });
    } catch (err) {
      show("error", err.message);
    }
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
        faculty_id: courseData.facultyId,
        name: courseData.name,
        duration: courseData.duration,
        duration_type: courseData.durationType,
      });

      show("success", "Course updated successfully");
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
  allFaculties.forEach((f) => {
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

      <CourseForm
        courseTypes={courseTypes}
        selectedCourseType={selectedCourseType}
        onCourseTypeChange={handleCourseTypeChange}
        facultyList={facultyList}
        selectedFaculty={selectedFaculty}
        onFacultyChange={handleFacultyChange}
        onSubmit={handleCreate}
        mode="create"
        isEmptyFaculties={facultyList.length === 0}
      />

      <Table
        title="Course List"
        columns={columns}
        data={courses}
        actions={actions}
        loading={loading}
      />

      <Modal
        isOpen={!!editData}
        title="Edit Course"
        onClose={() => setEditData(null)}
      >
        {editData && (
          <CourseForm
            courseTypes={courseTypes}
            selectedCourseType={selectedCourseType}
            onCourseTypeChange={handleCourseTypeChange}
            facultyList={facultyList}
            selectedFaculty={selectedFaculty}
            onFacultyChange={handleFacultyChange}
            onSubmit={handleUpdate}
            initialData={editData}
            mode="edit"
            onCancel={() => setEditData(null)}
            isEmptyFaculties={facultyList.length === 0}
          />
        )}
      </Modal>

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
