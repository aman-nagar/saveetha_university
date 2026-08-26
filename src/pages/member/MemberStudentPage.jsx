import React, { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaFileExcel,
  FaFilePdf,
  FaUserGraduate,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaInfoCircle,
  FaSync,
  FaBook,
  FaLayerGroup,
  FaIdBadge,
  FaCheckCircle,
} from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import Table from "@/components/table/Table";
import DataTableLayout from "@/components/table/DataTableLayout";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StudentDetailView from "@/components/admin/students/StudentDetailView";
import { useToast } from "@/context/ToastContext";
import {
  activateMemberStudent,
  fetchMemberInactiveStudents,
  fetchMemberStudentById,
} from "@/api/member/membersApi";
import { downloadStudentPdf } from "@/utils/studentPdf";
import * as XLSX from "xlsx";

const isStudentActive = (student) => Number(student?.status) === 1;

export default function MemberStudentPage() {
  const { show } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const loadInactiveStudents = useCallback(
    async (page = 1, searchTerm = "") => {
      setLoading(true);
      try {
        const response = await fetchMemberInactiveStudents({
          page,
          search: searchTerm,
        });

        setStudents(response.students || []);
        setCurrentPage(response.current_page || 1);
        setTotalPages(response.total_pages || 1);
        setTotalRecords(response.total_records || 0);
        setPerPage(response.per_page || 10);
      } catch (err) {
        console.error("Failed to load inactive students:", err);
        show("error", err.message || "Failed to load inactive students");
      } finally {
        setLoading(false);
      }
    },
    [show],
  );

  useEffect(() => {
    loadInactiveStudents(1, "");
  }, [loadInactiveStudents]);

  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      setCurrentPage(1);
      loadInactiveStudents(1, value);
    },
    [loadInactiveStudents],
  );

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadInactiveStudents(page, search);
  };

  const handleRefresh = () => {
    loadInactiveStudents(currentPage, search);
    show("info", "Refreshing students data...");
  };

  // This screen lists inactive students, so a member can only activate them.
  const handleActivateStudent = async (student) => {
    if (!student?.id) return;

    setTogglingId(student.id);
    try {
      await activateMemberStudent(student.id);
      show("success", `Student "${student.candidate_name}" activated successfully`);
      setSelectedStudent(null);
      await loadInactiveStudents(currentPage, search);
    } catch (err) {
      console.error("Failed to activate student:", err);
      show("error", err.message || "Failed to activate student");
    } finally {
      setTogglingId(null);
    }
  };

  const handleViewStudent = async (row) => {
    setViewLoading(true);
    setSelectedStudent(row); // Initial preview
    try {
      const fullData = await fetchMemberStudentById(row.id);
      setSelectedStudent(fullData || row);
    } catch (err) {
      console.warn("Could not fetch full student record, using row data:", err);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDownloadPdf = async (student) => {
    setDownloadingId(student.id);
    try {
      let studentData = student;
      if (!student.father_name || !student.date_of_birth) {
        const fullData = await fetchMemberStudentById(student.id);
        if (fullData) studentData = fullData;
      }
      await downloadStudentPdf(studentData);
      show(
        "success",
        `Downloaded admission form for ${student.candidate_name}`,
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
      show("error", err.message || "Failed to generate student PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  // Export to Excel handler
  const handleExportExcel = () => {
    if (!students || students.length === 0) {
      show("warning", "No student data available to export");
      return;
    }

    setIsExporting(true);
    try {
      const exportData = students.map((item, index) => ({
        "S.No": (currentPage - 1) * perPage + index + 1,
        "Enrollment No": item.enrollment_no || "-",
        "Candidate Name": item.candidate_name || "-",
        "Center Name": item.institute_name || "Direct Admission",
        "Center ID": item.center_id || "-",
        "Contact Number": item.contact_number || "-",
        "Email Address": item.email || "-",
        Course: item.course || "-",
        Stream: item.stream || "-",
        Status: item.status === 1 ? "Active" : "Inactive",
        "Registered On": item.created_at || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inactive Students");

      // Auto size columns
      const maxCols = Object.keys(exportData[0] || {}).map((key) => ({
        wch: Math.max(key.length, 16),
      }));
      worksheet["!cols"] = maxCols;

      const dateStr = new Date().toISOString().split("T")[0];
      XLSX.writeFile(
        workbook,
        `Inactive_Students_Page_${currentPage}_${dateStr}.xlsx`,
      );
      show("success", "Exported inactive students successfully");
    } catch (err) {
      console.error("Export failed:", err);
      show("error", "Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  // Columns definition
  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, index) => (
        <span className="font-semibold text-muted text-xs sm:text-sm">
          {(currentPage - 1) * perPage + index + 1}
        </span>
      ),
    },
    {
      key: "photo",
      label: "Photo",
      render: (row) => (
        <div className="flex items-center justify-center">
          {row.photo_url ? (
            <img
              src={row.photo_url}
              alt={row.candidate_name || "Student"}
              className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-xl border border-border shadow-sm"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(row.candidate_name || "Student");
              }}
            />
          ) : (
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20 shadow-sm font-bold text-xs">
              {row.candidate_name ? (
                row.candidate_name.charAt(0).toUpperCase()
              ) : (
                <FaUserGraduate className="w-4 h-4 text-muted" />
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "student_info",
      label: "Candidate Details",
      render: (row) => (
        <div className="flex flex-col min-w-0 max-w-[200px] sm:max-w-[260px]">
          <span
            className="font-bold text-text text-sm hover:text-primary transition-colors truncate"
            title={row.candidate_name}
          >
            {row.candidate_name || "Unnamed Candidate"}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[11px] font-semibold border border-primary/20">
              <FaIdBadge className="w-2.5 h-2.5" />
              {row.enrollment_no || "No Enrollment"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "center_info",
      label: "Center / Institute",
      render: (row) => (
        <div className="flex flex-col min-w-0 max-w-[180px] sm:max-w-[240px]">
          <span
            className="font-semibold text-text text-xs sm:text-sm truncate"
            title={row.institute_name || "Direct Admission"}
          >
            {row.institute_name || "Direct Admission"}
          </span>
          {row.center_id && (
            <span className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
              <FaBuilding className="w-2.5 h-2.5 text-muted" />
              Center ID: #{row.center_id}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "contact_info",
      label: "Contact",
      render: (row) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-text flex items-center gap-1">
            <FaPhoneAlt className="w-2.5 h-2.5 shrink-0 text-accent" />
            {row.contact_number || "—"}
          </span>
          <span className="text-[11px] text-muted flex items-center gap-1 mt-0.5 truncate max-w-[160px]">
            <FaEnvelope className="w-2.5 h-2.5 shrink-0 text-muted" />
            <span className="truncate">{row.email || "—"}</span>
          </span>
        </div>
      ),
    },
    {
      key: "academics",
      label: "Academic Info",
      render: (row) => (
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-1">
            <FaBook className="w-2.5 h-2.5 text-primary" />
            <span className="text-[11px] font-medium text-text">
              Course:{" "}
              <strong className="font-semibold">{row.course || "N/A"}</strong>
            </span>
          </div>
          {row.stream && (
            <div className="flex items-center gap-1 text-muted text-[11px]">
              <FaLayerGroup className="w-2.5 h-2.5 text-accent" />
              <span>Stream: {row.stream}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status / Activation",
      render: (row) => {
        const isActive = isStudentActive(row);
        const isToggling = togglingId === row.id;

        return (
          <button
            type="button"
            onClick={() => handleActivateStudent(row)}
            disabled={isToggling || isActive}
            title={isActive ? "Student is already active" : "Activate student"}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 shadow-2xs ${
              isActive
                ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/25"
                : "bg-red-500/15 text-red-600 border border-red-500/30 hover:bg-red-500/25"
            } ${isToggling ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
          >
            {isToggling ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
            )}
            <span>{isActive ? "Active" : "Activate"}</span>
          </button>
        );
      },
    },
    {
      key: "created_at",
      label: "Registered On",
      render: (row) => (
        <span className="text-xs text-muted whitespace-nowrap">
          {row.created_at ? row.created_at.split(" ")[0] : "—"}
        </span>
      ),
    },
  ];

  // Actions definition (View Details + Download PDF)
  const actions = [
    {
      icon: <FaEye className="w-3.5 h-3.5" />,
      className:
        "p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 transition-all shadow-xs",
      title: "View Student Profile",
      onClick: handleViewStudent,
    },
    {
      icon: <FaFilePdf className="w-3.5 h-3.5" />,
      className:
        "p-2 rounded-xl bg-rose-600/10 text-rose-600 hover:bg-rose-600/20 hover:scale-105 transition-all shadow-xs",
      title: "Download Admission PDF",
      onClick: handleDownloadPdf,
    },
  ];

  // Top summary stats
  const statCards = [
    {
      label: "Inactive Students",
      value: totalRecords,
      icon: <HiUserGroup className="w-5 h-5" />,
      color: "text-red-600",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      label: "Current Page",
      value: `${currentPage} of ${totalPages}`,
      icon: <FaInfoCircle className="w-4 h-4" />,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Viewing On Page",
      value: students.length,
      icon: <FaUserGraduate className="w-4 h-4" />,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
  ];

  // Toolbar
  const toolbar = (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap w-full">
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        onDebounce={handleSearch}
        placeholder="Search student by name, enrollment, center..."
        delay={500}
        className="flex-1 sm:flex-none"
        inputClassName="sm:w-64 md:w-80"
      />

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="secondary"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-2"
          title="Refresh Data"
        >
          <FaSync className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>

        <Button
          onClick={handleExportExcel}
          disabled={isExporting || students.length === 0}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <FaFileExcel className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{isExporting ? "Exporting..." : "Export Excel"}</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-8">
      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-secondary rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-accent/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md border border-white/20">
              Member Portal • Student Directory
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black tracking-tight">
            Inactive Students Directory
          </h1>
          <p className="text-white/80 text-sm max-w-2xl">
            Browse, edit, and activate student enrollments across all centers and direct admissions. Click on the status badge to toggle student active state.
          </p>
        </div>
      </div>

      {/* Top Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-2xl border border-border p-4 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-text mt-1">{stat.value}</p>
            </div>
            <div
              className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <DataTableLayout
        title="Inactive Students List"
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
          pageOffset={(currentPage - 1) * perPage}
          emptyMessage="No inactive students found matching your query."
        />
      </DataTableLayout>

      {/* Student Details Modal */}
      <Modal
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        title={
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-primary w-4 h-4" />
            <span>Student Profile Details</span>
            {selectedStudent?.enrollment_no && (
              <span className="text-xs text-muted font-mono">
                ({selectedStudent.enrollment_no})
              </span>
            )}
          </div>
        }
        size="4xl"
        footer={
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={() => handleActivateStudent(selectedStudent)}
                disabled={
                  togglingId === selectedStudent?.id ||
                  isStudentActive(selectedStudent)
                }
                className="flex items-center gap-1.5 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {togglingId === selectedStudent?.id ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaCheckCircle className="w-3.5 h-3.5" />
                )}
                <span>Activate Student</span>
              </Button>

            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                onClick={() => handleDownloadPdf(selectedStudent)}
                disabled={downloadingId === selectedStudent?.id}
                className="flex items-center gap-1.5 text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white"
              >
                <FaFilePdf className="w-3.5 h-3.5" />
                <span>
                  {downloadingId === selectedStudent?.id
                    ? "Generating..."
                    : "Download PDF"}
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </Button>
            </div>
          </div>
        }
      >
        {selectedStudent && (
          <div className="max-h-[75vh] overflow-y-auto pr-1">
            <StudentDetailView
              student={selectedStudent}
              loading={viewLoading}
              onClose={() => setSelectedStudent(null)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
