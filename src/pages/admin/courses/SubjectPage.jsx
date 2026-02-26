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
} from "../../../api/courses/subjectApi"; // note: we removed updateSubjectStatus import
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
    setData, // ← added
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
      setData([]); // clear table
    }
    if (editData) setEditData(null);
  };

  const handleCreate = async (payload) => {
    try {
      await createSubject(payload);
      show("success", "Subject created");
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleUpdate = async (payload) => {
    if (!editData) return;
    try {
      await updateSubject(editData.id, payload);
      show("success", "Subject updated");
      setEditData(null);
      load(selectedStream);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      // Fetch full subject data to get all required fields
      const subject = await fetchSubjectById(id);
      const newStatus = currentStatus === 1 ? 0 : 1;
      const { id: _, ...payload } = subject; // remove id
      payload.status = newStatus;
      await updateSubject(id, payload);
      show(
        "success",
        `Status updated to ${newStatus === 1 ? "Active" : "Inactive"}`,
      );
      load(selectedStream); // refresh list
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
      show("success", "Subject deleted");
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
    { key: "short_name", label: "Short Name" },
    { key: "max_theory_marks", label: "Theory Max" },
    { key: "max_practical_marks", label: "Practical Max" },
    { key: "duration", label: "Duration" },
    { key: "duration_type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row.id, row.status)}
          className={`px-3 py-1 rounded text-white text-sm font-medium transition ${
            row.status === 1
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {row.status === 1 ? "Active" : "Inactive"}
        </button>
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
