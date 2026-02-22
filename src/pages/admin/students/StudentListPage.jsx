// src/pages/admin/students/StudentListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPen, FaTrash, FaEye, FaRecycle, FaFilePdf, FaSearch,
} from "react-icons/fa";
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

/* ─── Small PDF download helper ─── */
function downloadStudentPdf(student) {
  const rows = [
    ["Enrollment No", student.enrollment_no],
    ["Name", student.candidate_name],
    ["Father", student.father_name],
    ["Mother", student.mother_name],
    ["DOB", student.dob],
    ["Gender", student.gender],
    ["Category", student.category],
    ["Contact", student.contact_number],
    ["Email", student.email],
    ["Address", student.address],
    ["Course", student.course],
    ["Faculty", student.faculty],
    ["Course Type", student.course_type],
    ["Stream", student.stream],
    ["Year", student.year],
    ["Session", student.session],
    ["Mode", student.mode_of_study],
    ["Status", student.status === 1 ? "Active" : "Inactive"],
  ];

  const html = `
  <html>
    <head>
      <title>Student - ${student.candidate_name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
        h1 { font-size: 20px; margin-bottom: 4px; }
        p.enroll { color: #555; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background: #f4f4f4; font-weight: 600; width: 35%; }
      </style>
    </head>
    <body>
      <h1>${student.candidate_name}</h1>
      <p class="enroll">Enrollment: ${student.enrollment_no}</p>
      <table>
        ${rows.filter(([, v]) => v).map(([l, v]) => `<tr><th>${l}</th><td>${v}</td></tr>`).join("")}
      </table>
    </body>
  </html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 500);
}

/* ─── Clickable status toggle badge ─── */
function StatusToggle({ row, onToggle }) {
  const isActive = row.status === 1;
  return (
    <button
      onClick={() => onToggle(row)}
      title="Click to toggle status"
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        transition-colors cursor-pointer
        ${isActive
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-yellow-500"}`} />
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}

export default function StudentListPage() {
  const { toast, show, clear } = useToast();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("active"); // "active" | "recycle"

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

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
      show("error", err.message || "Failed to load students");
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
    setCurrentPage(page);
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

  const handleEdit = (row) => navigate(`/admin/students/edit/${row.id}`);

  const handleToggleStatus = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;
    // Optimistic update
    setStudents((prev) =>
      prev.map((s) => (s.id === row.id ? { ...s, status: newStatus } : s))
    );
    try {
      await updateStudentStatus(row.id, newStatus);
      show("success", "Status updated");
    } catch (err) {
      // Rollback
      setStudents((prev) =>
        prev.map((s) => (s.id === row.id ? { ...s, status: row.status } : s))
      );
      show("error", err.message || "Failed to update status");
    }
  };

  const handleDelete = async (row) => {
    const isPermanent = mode === "recycle";
    const message = isPermanent
      ? "Permanently delete this student? This action cannot be undone."
      : "Move student to Recycle Bin?";

    if (!window.confirm(message)) return;

    try {
      await deleteStudent(row.id);
      setStudents((prev) => prev.filter((s) => s.id !== row.id));
      show("success", isPermanent ? "Permanently deleted" : "Moved to Recycle Bin");
    } catch (err) {
      show("error", err.message || "Delete failed");
    }
  };

  const handleRestore = async (row) => {
    if (!window.confirm("Restore this student to Active list?")) return;

    try {
      await restoreStudent(row.id);
      setStudents((prev) => prev.filter((s) => s.id !== row.id));
      show("success", "Student restored to Active");
    } catch (err) {
      show("error", err.message || "Restore failed");
    }
  };

  const handleDownloadPdf = async (row) => {
    try {
      const fullData = await fetchStudentById(row.id);
      downloadStudentPdf(fullData);
    } catch (err) {
      show("error", "Failed to load student data for PDF");
    }
  };

  // ── Columns ──
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
            className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {row.candidate_name?.[0]?.toUpperCase() || "?"}
          </div>
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
      render: (row) =>
        mode === "active" ? (
          <StatusToggle row={row} onToggle={handleToggleStatus} />
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
  ];

  // ── Actions ──
  const actions =
    mode === "active"
      ? [
          {
            icon: <FaEye />,
            title: "View",
            className: "p-2 bg-primary text-white rounded hover:opacity-80 transition",
            onClick: handleView,
          },
          {
            icon: <FaPen />,
            title: "Edit",
            className: "p-2 bg-blue-600 text-white rounded hover:opacity-80 transition",
            onClick: handleEdit,
          },
          {
            icon: <FaFilePdf />,
            title: "Download PDF",
            className: "p-2 bg-orange-500 text-white rounded hover:opacity-80 transition",
            onClick: handleDownloadPdf,
          },
          {
            icon: <FaTrash />,
            title: "Delete",
            className: "p-2 bg-red-600 text-white rounded hover:opacity-80 transition",
            onClick: handleDelete,
          },
        ]
      : [
          {
            icon: <FaRecycle />,
            title: "Restore",
            className: "p-2 bg-green-600 text-white rounded hover:opacity-80 transition",
            onClick: handleRestore,
          },
          {
            icon: <FaTrash />,
            title: "Permanent Delete",
            className: "p-2 bg-red-800 text-white rounded hover:opacity-80 transition",
            onClick: handleDelete,
          },
        ];

  // ── Toolbar (only search + mode switch now) ──
  const toolbar = (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={handleSearch}
          className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Mode switch */}
      <div className="flex border border-border rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => setMode("active")}
          className={`px-4 py-2 text-sm font-medium transition ${
            mode === "active" ? "bg-primary text-white" : "bg-surface text-text hover:bg-bg"
          }`}
        >
          Active Students
        </button>
        <button
          onClick={() => setMode("recycle")}
          className={`px-4 py-2 text-sm font-medium border-l border-border transition ${
            mode === "recycle" ? "bg-primary text-white" : "bg-surface text-text hover:bg-bg"
          }`}
        >
          Recycle Bin
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {toast && <Toast {...toast} onClose={clear} />}

      <Table
        title={mode === "active" ? "All Students" : "Recycle Bin"}
        toolbar={toolbar}
        columns={columns}
        data={students}
        actions={actions}
        loading={loading}
        emptyMessage={
          mode === "active"
            ? "No active students found"
            : "Recycle bin is empty"
        }
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`min-w-[38px] px-3 py-2 rounded-md text-sm font-medium transition ${
                page === currentPage
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border hover:bg-surface/80"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={viewOpen}
        title="Student Details"
        size="max-w-4xl"
        onClose={() => {
          setViewOpen(false);
          setSelectedStudent(null);
        }}
      >
        {viewLoading ? (
          <div className="py-20 flex flex-col items-center gap-4 text-muted">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p>Loading student details...</p>
          </div>
        ) : selectedStudent ? (
          <StudentDetailView student={selectedStudent} />
        ) : null}
      </Modal>
    </div>
  );
}