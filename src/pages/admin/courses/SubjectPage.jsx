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
    load();
  }, []);

  const loadStreams = async () => {
    try {
      const data = await fetchAllStreams();
      setStreamList(data);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleCreate = async (data) => {
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
        <div
          className="flex items-center justify-center cursor-pointer"
          title={row.status == 1 ? "Active" : "Inactive"}
        >
          <span
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              row.status == 1 ? "bg-success" : "bg-muted"
            }`}
          />
        </div>
      ),
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
    <div className="w-full space-y-8 p-2">
      {toast && <Toast {...toast} onClose={clear} />}

      <SubjectForm
        streamList={streamList}
        selectedStream={selectedStream}
        onStreamChange={setSelectedStream}
        onSubmit={handleCreate}
        mode="create"
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
          streamList={streamList}
          selectedStream={selectedStream}
          onStreamChange={setSelectedStream}
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
            Delete "<strong>{target.subject_name}</strong>"?
          </p>
        )}
      </Modal>
    </div>
  );
}
