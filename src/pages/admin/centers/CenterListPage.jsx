// src/pages/admin/centers/CenterListPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCenters,
  toggleCenterStatus,
  deleteCenter,
} from "../../../api/center/centerApi";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../hooks/useConfirm";
import Table from "../../../components/table/Table";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { HiPlus } from "react-icons/hi";
import { getCenterActions, getCenterColumns } from "./centerTableConfig";

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
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    loadCenters(1, "");
  }, []);

  const loadCenters = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const response = await fetchCenters({ page, search: searchTerm });
      setCenters(response.data || []);
      setCurrentPage(response.current_page || 1);
      setTotalPages(response.total_pages || 1);
      setPerPage(response.per_page || 10);
    } catch (err) {
      console.error("Error loading centers:", err);
      show("error", err.message || "Failed to load centers");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((searchTerm) => {
    setSearch(searchTerm);
    loadCenters(1, searchTerm);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadCenters(page, search);
  };

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

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

  const columns = getCenterColumns({
    handleToggle,
    togglingId,
  });

  const actions = getCenterActions({
    navigate,
    handleDelete,
  });

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap w-full">
      {/* Search Input */}
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        onDebounce={handleSearch}
        placeholder="Search center by name, email..."
        delay={500}
        className="flex-1 sm:flex-none"
        inputClassName="sm:w-56 md:w-64"
      />

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
      <DataTableLayout
        title="Center Management"
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
