import React, { useEffect, useState, useCallback } from "react";
import { FaTrash, FaEye, FaDownload } from "react-icons/fa";
import {
  FetchCertificate,
  DeleteCertificate,
  fetchSingleCertificate,
} from "../../../api/certificate/certificate";

// Utilities & Components
import {
  getCertificateHtml,
  downloadCertificate,
} from "../../../utils/certificatePdfGenerator";
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../context/ToastContext";
import Button from "../../../components/ui/Button";
import Table from "../../../components/table/Table";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import CertificateGeneratorForm from "../../../components/admin/certificate/CertificateGeneratorForm";

export default function CreateCertificatePage() {
  const { toast, show, clear } = useToast();

  // Table States
  const [certificates, setCertificates] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  // Pagination & Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listSearch, setListSearch] = useState("");

  // Modal & Download States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  // --- Data Loading ---
  const loadCertificates = useCallback(
    async (page = 1, search = "") => {
      try {
        setLoadingList(true);
        const res = await FetchCertificate(page, search);
        setCertificates(res.data);
        setTotalPages(res.pagination?.total_pages || 1);
        setCurrentPage(res.pagination?.current_page || 1);
      } catch (error) {
        show("error", "Failed to load certificates");
      } finally {
        setLoadingList(false);
      }
    },
    [show],
  );

  useEffect(() => {
    loadCertificates(1, listSearch);
  }, [loadCertificates, listSearch]);

  // --- Handlers ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadCertificates(page, listSearch);
  };

  const handleSearch = (val) => {
    setListSearch(val);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;
    try {
      await DeleteCertificate(id);
      show("success", "Certificate deleted");
      loadCertificates(currentPage, listSearch);
    } catch (error) {
      show("error", error.message || "Failed to delete");
    }
  };

  const handleViewDetails = async (row) => {
    setIsFetchingDetails(true);
    try {
      const fullCertData = await fetchSingleCertificate(row.id);
      setSelectedCert(fullCertData);
      setIsViewModalOpen(true);
    } catch (error) {
      show("error", "Failed to fetch certificate details.");
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleDownloadAction = async (row) => {
    if (isDownloading) return;
    setIsDownloading(true);
    show("success", "Fetching data & Generating PDF...");

    try {
      const fullCertData = await fetchSingleCertificate(row.id);
      await downloadCertificate(fullCertData); // ✅ Calling the standalone utility
    } catch (err) {
      show("error", "Failed to generate PDF");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // --- Table Configuration ---
  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, i) => (currentPage - 1) * 10 + i + 1,
    },
    { key: "enrollment_no", label: "Enrollment no." },
    { key: "final_year", label: "Passing Year" },
    { key: "issue_date", label: "Issue Date" },
    { key: "course_name", label: "Course name" },
  ];

  const actions = [
    {
      icon: <FaEye />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      title: "View Certificate",
      onClick: handleViewDetails,
    },
    {
      icon: <FaDownload />,
      className:
        "px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm",
      title: "Download PDF",
      onClick: handleDownloadAction,
    },
    {
      icon: <FaTrash />,
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      title: "Delete Certificate",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  const toolbar = (
    <div className="w-full sm:w-64">
      <SearchInput
        onDebounce={handleSearch}
        placeholder="Search certificates..."
      />
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      <CertificateGeneratorForm
        showToast={show}
        onSuccess={() => loadCertificates(currentPage, listSearch)}
      />

      <DataTableLayout
        title="Generated Certificates"
        toolbar={toolbar}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      >
        {isFetchingDetails && (
          <div className="p-4 text-center text-sm text-primary animate-pulse">
            Loading detailed view...
          </div>
        )}
        <Table
          columns={columns}
          data={certificates}
          actions={actions}
          loading={loadingList}
          emptyMessage="No certificates found."
        />
      </DataTableLayout>

      {/* --- VIEW MODAL --- */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Certificate Preview"
        size="max-w-6xl"
      >
        {selectedCert && (
          // overflow-x-auto allows horizontal scrolling if the screen is smaller than A4 Landscape (297mm)
          <div className="w-full overflow-x-auto bg-gray-50 p-4 rounded-lg flex justify-center">
            {/* ✅ Rendering the exact same HTML template as the PDF generator */}
            <div
              dangerouslySetInnerHTML={{
                __html: getCertificateHtml(selectedCert, false),
              }}
            />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => handleDownloadAction(selectedCert)}
            disabled={isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
