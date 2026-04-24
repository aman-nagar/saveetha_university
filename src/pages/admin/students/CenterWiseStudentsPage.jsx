// src/pages/admin/students/CenterWiseStudentsPage.jsx
import { useEffect, useState } from "react";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/ui/Pagination";
import { useToast } from "../../../context/ToastContext";
import Toast from "../../../components/ui/Toast";
import {
  fetchCenterWiseStudents,
  exportCenterWiseStudentsCSV,
  fetchAllCentersForDropdown,
} from "../../../api/students/studentApi";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function CenterWiseStudentsPage() {
  const { toast, show, clear } = useToast();

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
  });

  useEffect(() => {
    const loadCenters = async () => {
      try {
        // Use the new API that returns ALL centers
        const centerList = await fetchAllCentersForDropdown();
        setCenters(centerList);
      } catch (err) {
        show("error", "Failed to load centers list: " + err.message);
      }
    };
    loadCenters();
  }, []);

  const loadStudents = async (centerId, page = 1) => {
    if (!centerId) {
      setStudents([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetchCenterWiseStudents(centerId, page);
      // Response structure: { students: [], pagination: {...} }
      setStudents(response.students || []);
      setPagination({
        current_page: response.pagination?.current_page || 1,
        total_pages: response.pagination?.total_pages || 1,
        total_records: response.pagination?.total_records || 0,
      });
    } catch (err) {
      show("error", err.message || "Failed to fetch students");
      setStudents([]);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_records: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    setSelectedCenter(centerId);
    if (centerId) {
      loadStudents(centerId, 1);
    } else {
      setStudents([]);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_records: 0,
      });
    }
  };

  const handlePageChange = (page) => {
    loadStudents(selectedCenter, page);
  };

  // Export Handler
  const handleExportCSV = async () => {
    if (!selectedCenter) return;
    setExporting(true);

    try {
      const csvData = await exportCenterWiseStudentsCSV(selectedCenter);

      const currentCenter = centers.find(
        (c) => String(c.id) === String(selectedCenter),
      );

      let fileNameSuffix = selectedCenter;
      if (currentCenter && currentCenter.institute_name) {
        fileNameSuffix = currentCenter.institute_name.replace(
          /[^a-zA-Z0-9]/g,
          "_",
        );
      }

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileNameSuffix}_students.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up

      show("success", "Export downloaded successfully!");
    } catch (err) {
      show("error", err.message || "Failed to download CSV");
    } finally {
      setExporting(false);
    }
  };

  const columns = [
    {
      header: "Photo",
      accessor: "photo",
      render: (row) => (
        <img
          src={row.photo || "/default-avatar.png"}
          alt={row.candidate_name || "Student"}
          className="w-10 h-10 rounded-full object-cover border border-border"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
      ),
    },
    { header: "Enrollment No.", accessor: "enrollment_no" },
    { header: "Name", accessor: "candidate_name" },
    { header: "Course", accessor: "course_name" },
    { header: "Contact", accessor: "contact_number" },
    { header: "Email", accessor: "email" },
  ];

  // Make dropdown scrollable with custom styling
  const toolbar = (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <div className="relative w-full sm:w-64">
        <select
          value={selectedCenter}
          onChange={handleCenterChange}
          className="w-full px-4 py-2 pr-8 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
            backgroundSize: "16px",
          }}
        >
          <option value="">-- Select a Center --</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.institute_name || `Center #${center.id}`}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleExportCSV}
        disabled={!selectedCenter || exporting || students.length === 0}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto whitespace-nowrap"
      >
        <FaArrowAltCircleUp className="w-3.5 h-3.5" />
        {exporting ? "Exporting..." : "Export CSV"}
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {toast && <Toast {...toast} onClose={clear} />}

      <DataTableLayout
        title="Center Wise Students"
        toolbar={toolbar}
        pagination={
          selectedCenter &&
          students.length > 0 &&
          pagination.total_pages > 1 ? (
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              onPageChange={handlePageChange}
            />
          ) : null
        }
      >
        {!selectedCenter ? (
          <div className="p-10 text-center text-muted">
            Please select a center from the dropdown to view its students.
          </div>
        ) : (
          <Table
            columns={columns}
            data={students}
            loading={loading}
            emptyMessage="No students found for this center."
          />
        )}
      </DataTableLayout>
    </div>
  );
}
