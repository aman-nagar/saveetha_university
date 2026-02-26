// src/pages/admin/courses/SubjectPage.jsx
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { fetchAllStreams } from "../../../api/courses/streamApi";
import {
  fetchSubjects,
  fetchSubjectById,
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
    setData,
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
    if (value) {
      load(value);
    } else {
      setData([]);
    }
    if (editData) setEditData(null);
  };

  const handleCreate = async (payload) => {
    try {
      await createSubject(payload);
      show("success", "Subject created successfully");
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (payload) => {
    if (!editData) return;
    try {
      await updateSubject(editData.id, payload);
      show("success", "Subject updated successfully");
      setEditData(null);
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleEditClick = async (row) => {
    try {
      const freshData = await fetchSubjectById(row.id);
      setEditData(freshData);
      setSelectedStream(freshData.stream_id);
    } catch (err) {
      show("error", "Failed to fetch subject details: " + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;
    try {
      await remove(target.id);
      show("success", "Subject deleted successfully");
    } catch (err) {
      show("error", err.message);
    } finally {
      close();
    }
  };

  const streamMap = {};
  streamList.forEach((s) => {
    streamMap[s.id] = s.name;
  });

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    {
      key: "stream",
      label: "Stream",
      render: (row) => streamMap[row.stream_id] || "—",
    },
    { key: "subject_name", label: "Subject Name" },
    { key: "subject_code", label: "Code" },
    { key: "short_name", label: "Short" },
    {
      key: "marks",
      label: "Marks",
      render: (row) => `${row.max_theory_marks}/${row.max_practical_marks}`,
    },
    {
      key: "duration",
      label: "Duration",
      render: (row) => `${row.duration} ${row.duration_type}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.status === 1
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          {row.status === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: <FaPen />,
      className:
        "px-3 py-1 rounded bg-primary text-white hover:bg-primary/80 text-sm",
      onClick: handleEditClick,
    },
    {
      icon: <FaTrash />,
      className:
        "px-3 py-1 rounded bg-danger text-white hover:bg-danger/80 text-sm",
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
        emptyMessage={
          selectedStream
            ? "No subjects found for selected stream."
            : "Select a stream to view subjects."
        }
      />

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
              className="px-4 py-2 bg-danger text-white rounded"
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
