// src/pages/admin/students/StudentListPage.jsx

import { useEffect, useState } from "react";

import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../hooks/useToast";
import { fetchStudentById, fetchStudents } from "../../../api/students/studentApi";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function StudentListPage() {
  const { toast, show, clear } = useToast();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  // Load page 1
  useEffect(() => {
    loadStudents(1, "");
  }, []);

  const loadStudents = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const data = await fetchStudents({
        page,
        search: searchTerm,
      });

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

  const statusMap = {
    1: "Active",
    2: "Pending",
    3: "Rejected",
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
    {
      key: "enrollment_no",
      label: "Enrollment",
      render: (row) => (
        <span className="font-mono text-xs">{row.enrollment_no}</span>
      ),
    },
    {
      key: "candidate_name",
      label: "Name",
      render: (row) => (
        <div className="font-medium text-text">{row.candidate_name}</div>
      ),
    },
    { key: "course", label: "Course" },
    { key: "contact_number", label: "Contact" },
    {
      key: "email",
      label: "Email",
      render: (row) => <span className="text-muted text-xs">{row.email}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const actions = [
    {
      icon: "👁",
      className:
        "px-3 py-1 rounded bg-primary text-white hover:bg-primary/90 text-sm",
      onClick: handleView,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 border border-border rounded-lg px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <Table
        title="Students"
        columns={columns}
        data={students}
        actions={actions}
        loading={loading}
        emptyMessage="No students found"
      />
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md text-sm ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-surface border border-border hover:bg-bg"
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
        onClose={() => {
          setViewOpen(false);
          setSelectedStudent(null);
        }}
      >
        {viewLoading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : selectedStudent ? (
          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {selectedStudent.candidate_name}
              </div>
              <div>
                <strong>Enrollment:</strong> {selectedStudent.enrollment_no}
              </div>
              <div>
                <strong>Course:</strong> {selectedStudent.course}
              </div>
              <div>
                <strong>Stream:</strong> {selectedStudent.stream}
              </div>
              <div>
                <strong>Session:</strong> {selectedStudent.session}
              </div>
              <div>
                <strong>Contact:</strong> {selectedStudent.contact_number}
              </div>
              <div>
                <strong>Email:</strong> {selectedStudent.email}
              </div>
              <div>
                <strong>City:</strong> {selectedStudent.city}
              </div>
            </div>

            {selectedStudent.qualifications?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Qualifications</h3>
                <div className="space-y-2">
                  {selectedStudent.qualifications.map((q, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-md p-3"
                    >
                      <div>
                        <strong>{q.examination}</strong>
                      </div>
                      <div>{q.board_university}</div>
                      <div>{q.year_of_passing}</div>
                      <div>{q.percentage_cgpa}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
