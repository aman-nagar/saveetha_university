// src/pages/admin/courses/SubjectPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchAllStreams } from "../../../api/courses/streamApi";
import {
  fetchSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../../../api/courses/subjectApi";
import { useCrud } from "../../../hooks/useCrud";
import { useConfirm } from "../../../hooks/useConfirm";
import { useToast } from "../../../hooks/useToast";
import SubjectForm from "../../../components/admin/courses/SubjectForm";
import Toast from "../../../components/ui/Toast";
import Modal from "../../../components/ui/Modal";
import Table from "../../../components/table/Table";

export default function SubjectPage() {
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [streamList, setStreamList] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [editData, setEditData] = useState(null);

  const {
    data: subjects,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchSubjects,
    deleteFn: deleteSubject,
  });

  useEffect(() => {
    loadStreams();
  }, []);

  useEffect(() => {
    if (selectedStream) {
      load(selectedStream);
    }
  }, [selectedStream, load]);

  const loadStreams = async () => {
    try {
      const data = await fetchAllStreams();
      setStreamList(data);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleStreamChange = (value) => {
    setSelectedStream(value);
    if (editData) setEditData(null);
  };

  const handleCreate = async (subjectData) => {
    try {
      await createSubject(subjectData);
      show("success", "Subject created");
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (subjectData) => {
    if (!editData) return;
    try {
      await updateSubject(subjectData);
      show("success", "Subject updated");
      setEditData(null);
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;
    try {
      await remove(target.id);
      show("success", "Subject deleted");
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    { key: "subject_name", label: "Subject Name" },
    { key: "subject_code", label: "Code" },
    { key: "short_name", label: "Short Name" },
    { key: "max_theory_marks", label: "Theory Max" },
    { key: "max_practical_marks", label: "Practical Max" },
    { key: "duration", label: "Duration" },
    { key: "duration_type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
  ];

  const actions = [
    {
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      onClick: (row) => {
        setEditData(row);
        setSelectedStream(row.stream_id);
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

      <SubjectForm
        streamList={streamList}
        selectedStream={selectedStream}
        onStreamChange={handleStreamChange}
        onSubmit={handleCreate}
        mode="create"
      />

      <Table
        title="Subject List"
        columns={columns}
        data={subjects}
        actions={actions}
        loading={loading}
        emptyMessage="No subjects found for selected stream."
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editData}
        title="Edit Subject"
        onClose={() => setEditData(null)}
      >
        <SubjectForm
          streamList={streamList}
          selectedStream={selectedStream}
          onStreamChange={handleStreamChange}
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
            Delete subject "<strong>{target.subject_name}</strong>"?
          </p>
        )}
      </Modal>
    </div>
  );
}