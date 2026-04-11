import { useEffect, useState } from "react";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/ui/Pagination";
import { useToast } from "../../../context/ToastContext";
import Toast from "../../../components/ui/Toast";
import {
  fetchCenterWiseStudents,
  exportCenterWiseStudentsCSV,
} from "../../../api/students/studentApi";
import { fetchCenters } from "../../../api/center/centerApi";
import { FaDownload } from "react-icons/fa"; // ✅ Import the download icon

export default function CenterWiseStudentsPage() {
  const { toast, show, clear } = useToast();

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false); // ✅ Export loading state
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_records: 0,
  });

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const res = await fetchCenters();
        const centerList = Array.isArray(res) ? res : res.data || [];
        setCenters(centerList);
      } catch (err) {
        show("error", "Failed to load centers list");
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
      const data = response.data || response;

      setStudents(data.students || []);
      setPagination({
        current_page: data.pagination?.current_page || 1,
        total_pages: data.pagination?.total_pages || 1,
        total_records: data.pagination?.total_records || 0,
      });
    } catch (err) {
      show("error", err.message || "Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    setSelectedCenter(centerId);
    loadStudents(centerId, 1);
  };

  const handlePageChange = (page) => {
    loadStudents(selectedCenter, page);
  };

  // ✅ Add Export Handler
  const handleExportCSV = async () => {
    if (!selectedCenter) return;
    setExporting(true);

    try {
      const csvData = await exportCenterWiseStudentsCSV(selectedCenter);

      // 1. Find the selected center object from your centers array
      const currentCenter = centers.find(
        (c) => String(c.id) === String(selectedCenter),
      );

      // 2. Get the name and sanitize it (replace spaces/special chars with underscores)
      // Fallback to the ID if the name is somehow missing
      let fileNameSuffix = selectedCenter;
      if (currentCenter && currentCenter.institute_name) {
        fileNameSuffix = currentCenter.institute_name.replace(
          /[^a-zA-Z0-9]/g,
          "_",
        );
      }

      // 3. Create a Blob from the CSV string
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // 4. Create a hidden link and trigger download with the dynamic name
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileNameSuffix}_students.csv`);
      document.body.appendChild(link);
      link.click();

      // 5. Cleanup
      document.body.removeChild(link);
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
            e.target.src =
              "https://api.nsprowebtech.com/backend/uploads/students/photos/default.jpg";
          }}
        />
      ),
    },
    { header: "Enrollment No.", accessor: "enrollment_no" },
    { header: "Name", accessor: "candidate_name" },
    { header: "Course ID", accessor: "course" },
    { header: "Contact", accessor: "contact_number" },
    { header: "Email", accessor: "email" },
  ];

  // ✅ Updated Toolbar with Export Button
  const toolbar = (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <select
        value={selectedCenter}
        onChange={handleCenterChange}
        className="px-4 py-2 border border-border rounded-lg bg-surface text-text w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="">-- Select a Center --</option>
        {centers.map((center) => (
          <option key={center.id} value={center.id}>
            {center.institute_name || `Center #${center.id}`}
          </option>
        ))}
      </select>

      <button
        onClick={handleExportCSV}
        disabled={!selectedCenter || exporting || students.length === 0}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto whitespace-nowrap"
      >
        <FaDownload className="w-3.5 h-3.5" />
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
          selectedCenter && students.length > 0 ? (
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
