import React, { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaFileExcel,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaSync,
  FaUserTie,
} from "react-icons/fa";
import { HiOfficeBuilding, HiExclamationCircle } from "react-icons/hi";
import Table from "@/components/table/Table";
import DataTableLayout from "@/components/table/DataTableLayout";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import MemberEditCenterModal from "@/components/members/MemberEditCenterModal";
import { useToast } from "@/context/ToastContext";
import { fetchMemberInactiveCenters } from "@/api/member/membersApi";
import * as XLSX from "xlsx";

export default function MemberCenterPage() {
  const { show } = useToast();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [editingCenter, setEditingCenter] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const loadInactiveCenters = useCallback(
    async (page = 1, searchTerm = "") => {
      setLoading(true);
      try {
        const response = await fetchMemberInactiveCenters({
          page,
          search: searchTerm,
        });

        setCenters(response.data || []);
        setCurrentPage(response.current_page || 1);
        setTotalPages(response.total_pages || 1);
        setTotalRecords(response.total_records || 0);
        setPerPage(response.per_page || 10);
      } catch (err) {
        console.error("Failed to load inactive centers:", err);
        show("error", err.message || "Failed to load inactive centers");
      } finally {
        setLoading(false);
      }
    },
    [show],
  );

  useEffect(() => {
    loadInactiveCenters(1, "");
  }, [loadInactiveCenters]);

  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      setCurrentPage(1);
      loadInactiveCenters(1, value);
    },
    [loadInactiveCenters],
  );

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadInactiveCenters(page, search);
  };

  const handleRefresh = () => {
    loadInactiveCenters(currentPage, search);
    show("info", "Refreshing centers data...");
  };

  // Export to Excel handler
  const handleExportExcel = () => {
    if (!centers || centers.length === 0) {
      show("warning", "No center data available to export");
      return;
    }

    setIsExporting(true);
    try {
      const exportData = centers.map((item, index) => ({
        "S.No": (currentPage - 1) * perPage + index + 1,
        "Center ID": item.id || "-",
        "Institute Name": item.institute_name || "-",
        "Owner Name": item.institute_owner_name || "-",
        "Email Address": item.email || "-",
        "Contact Number": item.contact_number || "-",
        State: item.state || "-",
        District: item.district || "-",
        Pincode: item.pincode || "-",
        "Active Status": item.is_active ? "Active" : "Inactive",
        "Form Status": item.is_form_enabled ? "Enabled" : "Disabled",
        "Registered On": item.created_at || "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inactive Centers");

      // Auto size columns
      const maxCols = Object.keys(exportData[0] || {}).map((key) => ({
        wch: Math.max(key.length, 15),
      }));
      worksheet["!cols"] = maxCols;

      const dateStr = new Date().toISOString().split("T")[0];
      XLSX.writeFile(
        workbook,
        `Inactive_Centers_Page_${currentPage}_${dateStr}.xlsx`,
      );
      show("success", "Exported inactive centers successfully");
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
          {row.owner_image_url ? (
            <img
              src={row.owner_image_url}
              alt={row.institute_owner_name || "Center Owner"}
              className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-xl border border-border shadow-sm"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(row.institute_owner_name || "Center");
              }}
            />
          ) : (
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm font-bold text-xs">
              {row.institute_owner_name ? (
                row.institute_owner_name.charAt(0).toUpperCase()
              ) : (
                <FaBuilding className="w-4 h-4 text-muted" />
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "institute_name",
      label: "Institute Details",
      render: (row) => (
        <div className="flex flex-col min-w-0 max-w-[200px] sm:max-w-[280px]">
          <span
            className="font-bold text-text text-sm hover:text-primary transition-colors truncate"
            title={row.institute_name}
          >
            {row.institute_name || "Unnamed Institute"}
          </span>
          <span className="text-xs text-muted truncate flex items-center gap-1 mt-0.5">
            <FaMapMarkerAlt className="w-3 h-3 shrink-0 text-primary/70" />
            {row.district ? `${row.district}, ` : ""}
            {row.state || "Location N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "institute_owner_name",
      label: "Owner",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-text text-xs sm:text-sm">
            {row.institute_owner_name || "—"}
          </span>
          <span className="text-[11px] text-muted flex items-center gap-1">
            <FaEnvelope className="w-2.5 h-2.5 shrink-0 text-muted" />
            <span className="truncate max-w-[150px]">{row.email || "—"}</span>
          </span>
        </div>
      ),
    },
    {
      key: "contact_number",
      label: "Contact",
      render: (row) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-text flex items-center gap-1">
            <FaPhoneAlt className="w-2.5 h-2.5 shrink-0 text-accent" />
            {row.contact_number || "—"}
          </span>
          {row.pincode && (
            <span className="text-[11px] text-muted">PIN: {row.pincode}</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-600 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {row.is_active ? "Active" : "Inactive"}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${
              row.is_form_enabled
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
            }`}
          >
            Form: {row.is_form_enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      ),
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

  // Actions definition (View + Edit)
  const actions = [
    {
      icon: <FaEye className="w-3.5 h-3.5" />,
      className:
        "p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 transition-all shadow-xs",
      title: "View Center Details",
      onClick: (row) => setSelectedCenter(row),
    },
    {
      icon: <FaEdit className="w-3.5 h-3.5" />,
      className:
        "p-2 rounded-xl bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 hover:scale-105 transition-all shadow-xs",
      title: "Edit Center Details",
      onClick: (row) => setEditingCenter(row),
    },
  ];

  // Top summary stats
  const statCards = [
    {
      label: "Inactive Centers",
      value: totalRecords,
      icon: <HiOfficeBuilding className="w-5 h-5" />,
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
      value: centers.length,
      icon: <FaBuilding className="w-4 h-4" />,
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
        placeholder="Search center by name, owner, city..."
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
          disabled={isExporting || centers.length === 0}
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
              Member Portal • Center Directory
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black tracking-tight">
            Inactive Centers Management
          </h1>
          <p className="text-white/80 text-sm max-w-2xl">
            Browse, inspect, and update inactive centers across the university ecosystem.
            Search by institute name, owner, state, or district.
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
        title="Inactive Centers Directory"
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
          data={centers}
          actions={actions}
          loading={loading}
          pageOffset={(currentPage - 1) * perPage}
          emptyMessage="No inactive centers found matching your query."
        />
      </DataTableLayout>

      {/* Center Details Modal */}
      <Modal
        isOpen={Boolean(selectedCenter)}
        onClose={() => setSelectedCenter(null)}
        title="Center Profile & Details"
        size="lg"
        footer={
          <div className="flex justify-between items-center w-full">
            <Button
              onClick={() => {
                const target = selectedCenter;
                setSelectedCenter(null);
                setEditingCenter(target);
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FaEdit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </Button>
            <Button variant="secondary" onClick={() => setSelectedCenter(null)}>
              Close
            </Button>
          </div>
        }
      >
        {selectedCenter && (
          <div className="space-y-6">
            {/* Center Header Profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-bg border border-border">
              {selectedCenter.owner_image_url ? (
                <img
                  src={selectedCenter.owner_image_url}
                  alt={selectedCenter.institute_owner_name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-md"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(
                        selectedCenter.institute_owner_name || "Center",
                      );
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl border-2 border-primary/20 shadow-md">
                  {selectedCenter.institute_owner_name
                    ? selectedCenter.institute_owner_name
                        .charAt(0)
                        .toUpperCase()
                    : "C"}
                </div>
              )}

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/20">
                    Status: Inactive
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      selectedCenter.is_form_enabled
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-600 border border-slate-500/20"
                    }`}
                  >
                    Form:{" "}
                    {selectedCenter.is_form_enabled ? "Enabled" : "Disabled"}
                  </span>
                  <span className="text-xs text-muted font-mono">
                    ID #{selectedCenter.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text">
                  {selectedCenter.institute_name || "Unnamed Institute"}
                </h3>
                <p className="text-sm font-medium text-muted flex items-center justify-center sm:justify-start gap-1">
                  <FaUserTie className="w-3.5 h-3.5 text-primary" />
                  Owner: {selectedCenter.institute_owner_name || "Not specified"}
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
                <h4 className="font-bold text-text text-xs uppercase tracking-wider flex items-center gap-1.5 text-primary">
                  <FaPhoneAlt className="w-3 h-3" /> Contact Information
                </h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
                    <span className="text-muted">Phone Number:</span>
                    <span className="font-semibold text-text">
                      {selectedCenter.contact_number ? (
                        <a
                          href={`tel:${selectedCenter.contact_number}`}
                          className="hover:text-primary underline"
                        >
                          {selectedCenter.contact_number}
                        </a>
                      ) : (
                        "—"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
                    <span className="text-muted">Email Address:</span>
                    <span className="font-semibold text-text break-all">
                      {selectedCenter.email ? (
                        <a
                          href={`mailto:${selectedCenter.email}`}
                          className="hover:text-primary underline"
                        >
                          {selectedCenter.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
                <h4 className="font-bold text-text text-xs uppercase tracking-wider flex items-center gap-1.5 text-accent">
                  <FaMapMarkerAlt className="w-3 h-3" /> Location & Address
                </h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
                    <span className="text-muted">State:</span>
                    <span className="font-semibold text-text">
                      {selectedCenter.state || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
                    <span className="text-muted">District:</span>
                    <span className="font-semibold text-text">
                      {selectedCenter.district || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted">Pincode:</span>
                    <span className="font-semibold text-text">
                      {selectedCenter.pincode || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Meta */}
            <div className="p-4 rounded-xl border border-border bg-bg/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-primary" />
                <span>
                  Registered Date:{" "}
                  <strong className="text-text">
                    {selectedCenter.created_at || "Not available"}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiExclamationCircle className="w-4 h-4 text-warning" />
                <span>Center status is currently inactive.</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Member Edit Center Modal */}
      <MemberEditCenterModal
        isOpen={Boolean(editingCenter)}
        onClose={() => setEditingCenter(null)}
        center={editingCenter}
        onSuccess={() => loadInactiveCenters(currentPage, search)}
      />
    </div>
  );
}
