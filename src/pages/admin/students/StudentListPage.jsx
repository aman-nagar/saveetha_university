// src/pages/admin/students/StudentListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../hooks/useConfirm";
import StudentDetailView from "../../../components/admin/students/StudentDetailView";
import {
  fetchStudentById,
  fetchStudents,
  getRecycleStudentsList,
  updateStudentStatus,
  deleteStudent,
  restoreStudent,
} from "../../../api/students/studentApi";
import { useAuth } from "../../../context/AuthContext";
import Pagination from "../../../components/ui/Pagination";
import DataTableLayout from "../../../components/table/DataTableLayout";
import { getStudentActions, getStudentColumns } from "./studentTableConfig.js";
import { downloadStudentPdf } from "../../../utils/studentPdf.js";

export default function StudentListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();
  const navigate = useNavigate();
  const basePath = isAdmin
    ? "/admin"
    : user?.role === "center"
      ? "/center"
      : "/sub-center";
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

  const handleEdit = (row) => navigate(`${basePath}/students/edit/${row.id}`);

  const handleToggleStatus = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;
    // Optimistic update
    setStudents((prev) =>
      prev.map((s) => (s.id === row.id ? { ...s, status: newStatus } : s)),
    );
    try {
      await updateStudentStatus(row.id, newStatus);
      show("success", "Status updated");
    } catch (err) {
      // Rollback
      setStudents((prev) =>
        prev.map((s) => (s.id === row.id ? { ...s, status: row.status } : s)),
      );
      show("error", err.message || "Failed to update status");
    }
  };

  const handleDelete = (row) => {
    open({
      ...row,
      actionType: "delete",
      isPermanent: mode === "recycle",
    });
  };

  const handleRestore = async (row) => {
    open({ ...row, actionType: "restore" });
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const processConfirmAction = async () => {
    if (!target) return;

    setIsProcessing(true);

    try {
      if (target.actionType === "delete") {
        await deleteStudent(target.id);
        show(
          "success",
          target.isPermanent ? "Permanently deleted" : "Moved to Recycle Bin",
        );
      } else {
        await restoreStudent(target.id);
        show("success", "Student restored to Active");
      }

      setStudents((prev) => prev.filter((s) => s.id !== target.id));

      close();
    } catch (err) {
      show("error", err.message || "Action failed");
    } finally {
      setIsProcessing(false);
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

  const columns = getStudentColumns({
    mode,
    isAdmin,
    handleToggleStatus,
  });

  const actions = getStudentActions({
    mode,
    isAdmin,
    handleView,
    handleEdit,
    handleDownloadPdf,
    handleDelete,
    handleRestore,
  });

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap w-full">
      {/* Search */}
      <div className="relative flex-1 sm:flex-none">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={handleSearch}
          className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text w-full sm:w-56 md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Mode switch */}
      <div className="flex border border-border rounded-lg overflow-hidden shadow-sm self-start sm:self-auto">
        <button
          onClick={() => setMode("active")}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition ${
            mode === "active"
              ? "bg-primary text-white"
              : "bg-surface text-text hover:bg-bg"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setMode("recycle")}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-l border-border transition ${
            mode === "recycle"
              ? "bg-primary text-white"
              : "bg-surface text-text hover:bg-bg"
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

      <DataTableLayout
        title={mode === "active" ? "All Students" : "Recycle Bin"}
        toolbar={toolbar}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      >
        <Table
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
      </DataTableLayout>
      <Modal isOpen={isOpen} onClose={close} size="sm" title="Confirm Action">
        <div className="p-4 text-center space-y-4">
          <p className="text-sm">
            {target?.actionType === "delete"
              ? target?.isPermanent
                ? "Permanently delete this student?"
                : "Move student to Recycle Bin?"
              : "Restore this student to Active list?"}
          </p>

          <div className="flex gap-3">
            <button onClick={close} className="flex-1 py-2 border rounded-lg">
              Cancel
            </button>

            <button
              onClick={processConfirmAction}
              disabled={isProcessing}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg"
            >
              {isProcessing ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
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
