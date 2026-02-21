import { useEffect, useState } from "react";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import {
  fetchFaculty,
  createFaculty,
  deleteFaculty,
  updateFaculty,
} from "../../../api/courses/facultyApi";
import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../hooks/useToast";
import FacultyForm from "../../../components/admin/courses/FacultyForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function FacultyPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [courseTypes, setCourseTypes] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [editData, setEditData] = useState(null);

  const {
    data: facultyList,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchFaculty,
    deleteFn: deleteFaculty,
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

  const handleCourseChange = (value) => {
    setSelectedCourseType(value);
    if (value && !editData) load(value);
  };

  const handleCreate = async (name) => {
    if (!selectedCourseType) {
      show("warning", "Select course type first");
      return;
    }

    try {
      await createFaculty(selectedCourseType, name);
      show("success", "Faculty created");
      load(selectedCourseType);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (name) => {
    if (!editData) return;

    try {
      await updateFaculty(editData.id, name, selectedCourseType);
      show("success", "Faculty updated");
      setEditData(null);
      load(selectedCourseType);
    } catch (err) {
      show("error", err.message);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;

    try {
      await remove(target.id);
      show("success", "Faculty deleted");
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const courseTypeMap = {};
  courseTypes.forEach((ct) => {
    courseTypeMap[ct.id] = ct.name;
  });

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    {
      key: "course_type",
      label: "Course Type",
      render: (row) => courseTypeMap[row.course_type_id] || "-",
    },
    { key: "name", label: "Faculty Name" },
  ];

  const actions = [
    {
      icon: "✏️",
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => {
        setEditData(row);
        setSelectedCourseType(row.course_type_id);
      },
    },
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

      <FacultyForm
        courseTypes={courseTypes}
        selectedCourseType={selectedCourseType}
        onCourseChange={handleCourseChange}
        onSubmit={handleCreate}
        mode="create"
      />

      <Table
        title="Faculty List"
        columns={columns}
        data={facultyList}
        actions={actions}
        loading={loading}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Faculty"
        onClose={() => setEditData(null)}
      >
        <FacultyForm
          courseTypes={courseTypes}
          selectedCourseType={selectedCourseType}
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
