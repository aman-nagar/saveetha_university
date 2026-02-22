// src/pages/admin/students/StudentListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt, FaPen, FaTrash, FaEye, FaRecycle } from "react-icons/fa";
import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../hooks/useToast";
import StudentDetailView from "../../../components/admin/students/StudentDetailView";
import {
  fetchStudentById,
  fetchStudents,
  getRecycleStudentsList,
  updateStudentStatus,
  deleteStudent,
  restoreStudent,
} from "../../../api/students/studentApi";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function StudentListPage() {
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("active");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);


  // 🔥 Only one loader, controlled by mode
  useEffect(() => {
    loadStudents(1, search);
  }, [mode]);

  const loadStudents = async (page = 1, searchTerm = "") => {
    setLoading(true);

    try {
      let data;

      if (mode === "active") {
        data = await fetchStudents({ page, search: searchTerm });
      } else {
        data = await getRecycleStudentsList({ page, search: searchTerm });
      }

      setStudents(data.students || []);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    loadStudents(1, value);
  };

  const handlePageChange = (page) => {
    loadStudents(page, search);
  };

  const handleView = async (row) => {
    setViewLoading(true);
    setViewOpen(true);

    try {
      const fullData = await fetchStudentById(row.id);
      setSelectedStudent(fullData);
    } catch (err) {
      show("error", err.message);
    } finally {
      setViewLoading(false);
    }
  };

  // Navigate directly to the edit page — no modal needed
  const handleEdit = (row) => {
    navigate(`/admin/students/edit/${row.id}`);
  };


  const handleToggleStatus = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;

    setStudents((prev) =>
      prev.map((s) => (s.id === row.id ? { ...s, status: newStatus } : s)),
    );

    try {
      await updateStudentStatus(row.id, newStatus);
      show("success", "Status updated");
    } catch (err) {
      setStudents((prev) =>
        prev.map((s) => (s.id === row.id ? { ...s, status: row.status } : s)),
      );
      show("error", err.message);
    }
  };

  const handleDelete = async (row) => {
    try {
      const response = await deleteStudent(row.id);
      setStudents((prev) => prev.filter((s) => s.id !== row.id));
      show("success", response.message);
    } catch (err) {
      show("error", err.message);
    }
  };

  const handleRestore = async (row) => {
    try {
      await restoreStudent(row.id);
      setStudents((prev) => prev.filter((s) => s.id !== row.id));
      show("success", "Student restored");
    } catch (err) {
      show("error", err.message);
    }
  };

  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    {
      key: "photo",
      label: "Photo",
      render: (row) =>
        row.photo_url ? (
          <img
            src={row.photo_url}
            alt="student"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300" />
        ),
    },
    { key: "enrollment_no", label: "Enrollment" },
    { key: "candidate_name", label: "Name" },
    { key: "course", label: "Course" },
    { key: "contact_number", label: "Contact" },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const actions =
    mode === "active"
      ? [
          {
            icon: <FaSyncAlt />,
            title: "Toggle Status",
            className: "px-3 py-1 bg-accent rounded text-sm",
            onClick: handleToggleStatus,
          },
          {
            icon: <FaPen />,
            title: "Edit",
            className: "px-3 py-1 bg-blue-600 text-white rounded text-sm",
            onClick: handleEdit,
          },
          {
            icon: <FaTrash />,
            title: "Delete",
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm",
            onClick: handleDelete,
          },
          {
            icon: <FaEye />,
            title: "View",
            className: "px-3 py-1 bg-primary text-white rounded text-sm",
            onClick: handleView,
          },
        ]
      : [
          {
            icon: <FaRecycle />,
            title: "Restore",
            className: "px-3 py-1 bg-green-600 text-white rounded text-sm",
            onClick: handleRestore,
          },
          {
            icon: <FaTrash />,
            title: "Permanent Delete",
            className: "px-3 py-1 bg-red-800 text-white rounded text-sm",
            onClick: handleDelete,
          },
        ];

  return (
    <div className="space-y-6 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Mode Switch */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode("active")}
          className={`px-4 py-2 rounded ${
            mode === "active"
              ? "bg-primary text-white"
              : "bg-surface border border-border"
          }`}
        >
          Active Students
        </button>

        <button
          onClick={() => setMode("deleted")}
          className={`px-4 py-2 rounded ${
            mode === "deleted"
              ? "bg-primary text-white"
              : "bg-surface border border-border"
          }`}
        >
          Recycle Bin
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={handleSearch}
        className="w-full md:w-80 border border-border rounded-lg px-3 py-2"
      />

      <Table
        title={mode === "active" ? "Students" : "Recycle Bin"}
        columns={columns}
        data={students}
        actions={actions}
        loading={loading}
        emptyMessage="No students found"
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-border"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={viewOpen}
        title="Student Details"
        size="max-w-3xl"
        onClose={() => {
          setViewOpen(false);
          setSelectedStudent(null);
        }}
      >
        {viewLoading ? (
          <div className="py-16 flex flex-col items-center gap-3 text-text-muted">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading student details...</p>
          </div>
        ) : selectedStudent ? (
          <StudentDetailView student={selectedStudent} />
        ) : null}
      </Modal>

    </div>
  );
}

