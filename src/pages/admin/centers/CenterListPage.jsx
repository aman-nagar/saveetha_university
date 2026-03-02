// src/pages/admin/centers/CenterListPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCenters,
  updateCenter,
  toggleCenterStatus,
  deleteCenter,
} from "../../../api/center/centerApi";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../hooks/useConfirm";
import Table from "../../../components/table/Table";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Pagination from "../../../components/ui/Pagination";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import { FaToggleOn, FaToggleOff, FaSpinner, FaSearch } from "react-icons/fa";

export default function CenterListPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCenters(1, search);
  }, []);

  const loadCenters = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const response = await fetchCenters({ page, search: searchTerm });
      console.log("Full response:", response);

      // response is the pagination object directly
      setCenters(response.data || []);
      setCurrentPage(response.current_page || 1);
      setTotalPages(response.total_pages || 1);

      console.log("Centers set:", response.data?.length);
    } catch (err) {
      console.log("Centers set:", response.data?.length);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    loadCenters(1, value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadCenters(page, search);
  };

  const handleToggle = async (row, field) => {
    try {
      setTogglingId(row.id);

      // Convert boolean to numeric for PHP backend
      const currentVal = row[field];
      const numericValue = currentVal ? 0 : 1;

      // Use JSON for PUT request as required by index.php
      await toggleCenterStatus({
        id: row.id,
        [field]: numericValue,
      });

      // Update local state with boolean for React UI
      setCenters((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, [field]: !currentVal } : item,
        ),
      );

      show("success", "Status updated successfully");
    } catch (err) {
      show("error", err.message || "Failed to update");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = (row) => {
    open(row);
  };

  const confirmDelete = async () => {
    if (!target) return;
    setIsDeleting(true);
    try {
      await deleteCenter(target.id);
      setCenters((prev) => prev.filter((c) => c.id !== target.id));
      show("success", `Center "${target.institute_name}" deleted`);
      close();
    } catch (err) {
      show("error", err.message || "Failed to delete center");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, i) => (
        <span className="text-muted text-xs sm:text-sm">{i + 1}</span>
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
              alt={row.institute_owner_name}
              className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg border border-border shadow-sm"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(row.institute_owner_name);
              }}
            />
          ) : (
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted/10 flex items-center justify-center border border-dashed border-border">
              <span className="text-[10px] text-muted text-center leading-tight">
                No
                <br />
                Img
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "institute_name",
      label: "Institute",
      render: (row) => (
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-text text-sm sm:text-base truncate">
            {row.institute_name}
          </span>
          <span className="text-xs text-muted truncate hidden sm:block">
            {row.institute_full_address}
          </span>
          <span className="text-xs text-muted sm:hidden">
            {row.state}, {row.district}
          </span>
        </div>
      ),
    },
    {
      key: "institute_owner_name",
      label: "Owner",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm sm:text-base">
            {row.institute_owner_name}
          </span>
          <span className="text-[10px] sm:text-xs text-muted">
            DOB: {row.date_of_birth}
          </span>
        </div>
      ),
    },
    {
      key: "contact_number",
      label: "Contact",
      render: (row) => (
        <div className="flex flex-col text-xs sm:text-sm">
          <span className="truncate">{row.contact_number}</span>
          <span className="text-primary hover:underline truncate hidden sm:block text-xs">
            {row.email}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {/* Form Enabled Toggle */}
          <button
            onClick={() => handleToggle(row, "is_form_enabled")}
            disabled={togglingId === row.id}
            className="flex items-center gap-1.5 sm:gap-2 focus:outline-none group"
          >
            {togglingId === row.id ? (
              <FaSpinner className="animate-spin text-primary w-4 h-4 sm:w-5 sm:h-5" />
            ) : row.is_form_enabled ? (
              <FaToggleOn className="w-5 h-5 sm:w-6 sm:h-6 text-success group-hover:text-success/80 transition-colors" />
            ) : (
              <FaToggleOff className="w-5 h-5 sm:w-6 sm:h-6 text-muted group-hover:text-muted/70 transition-colors" />
            )}
            <span className="text-xs sm:text-sm text-muted">
              Form {row.is_form_enabled ? "On" : "Off"}
            </span>
          </button>

          {/* Active Status Toggle using Boolean logic */}
          <button
            onClick={() => handleToggle(row, "is_active")}
            disabled={togglingId === row.id}
            className="flex items-center gap-1.5 sm:gap-2 focus:outline-none group"
          >
            {togglingId === row.id ? (
              <FaSpinner className="animate-spin text-primary w-4 h-4 sm:w-5 sm:h-5" />
            ) : row.is_active ? (
              <FaToggleOn className="w-5 h-5 sm:w-6 sm:h-6 text-success group-hover:text-success/80 transition-colors" />
            ) : (
              <FaToggleOff className="w-5 h-5 sm:w-6 sm:h-6 text-danger group-hover:text-danger/70 transition-colors" />
            )}
            <span
              className={`text-xs sm:text-sm ${row.is_active ? "text-success" : "text-danger"}`}
            >
              {row.is_active ? "Active" : "Inactive"}
            </span>
          </button>
        </div>
      ),
    },
  ];

  const actions = [
    {
      icon: <HiPencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      className:
        "p-1.5 sm:p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
      title: "Edit Center",
      onClick: (row) => navigate(`/admin/centers/add?id=${row.id}`),
    },
    {
      icon: <HiTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      className:
        "p-1.5 sm:p-2 rounded-md bg-danger/10 text-danger hover:bg-danger/20 transition-colors",
      title: "Delete Center",
      onClick: handleDelete,
    },
  ];

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap w-full">
      {/* Search */}
      <div className="relative flex-1 sm:flex-none">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
        <input
          type="text"
          placeholder="Search center..."
          value={search}
          onChange={handleSearch}
          className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text w-full sm:w-56 md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        
      </div>

      {/* Add Button */}
      <Button
        onClick={() => navigate("/admin/centers/add")}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm justify-center sm:justify-start"
      >
        <HiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Add New Center</span>
        <span className="sm:hidden">Add Center</span>
      </Button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-text">
          Center Management
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-0.5">
          Manage registered centers and their status
        </p>
      </div>

      <DataTableLayout
        title=""
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
          emptyMessage="No centers found. Click 'Add New Center' to get started."
        />
      </DataTableLayout>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        size="sm"
        footer={
          <div className="flex gap-3 w-full">
            <button
              onClick={close}
              className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-surface/80 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        }
      >
        {target && (
          <div className="space-y-4">
            <p className="text-text">
              This action cannot be undone. All associated data including
              student records and course assignments will be permanently
              removed.
            </p>
            <p className="text-sm text-muted">
              <strong>Center:</strong> {target.institute_name}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
