// src/pages/admin/centers/CenterListPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCenters, updateCenter } from "../../../api/center/centerApi";
import { useCrud } from "../../../hooks/useCrud";
import { useToast } from "../../../hooks/useToast";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import { FaToggleOn, FaToggleOff, FaSpinner } from "react-icons/fa";
import { useConfirm } from "../../../hooks/useConfirm";
import Modal from "../../../components/ui/Modal";

export default function CenterListPage() {
  const navigate = useNavigate();
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();
  const [togglingId, setTogglingId] = useState(null);

  const {
    data: centers,
    loading,
    load,
    setData,
    remove,
  } = useCrud({
    fetchFn: fetchCenters,
    deleteFn: async (id) => {
      console.log(`[CenterListPage.jsx] Delete ID: ${id}`);
    },
  });

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = async (row, field) => {
    try {
      setTogglingId(row.id);
      const formData = new FormData();
      formData.append("id", row.id);
      formData.append("institute_owner_name", row.institute_owner_name);
      formData.append("institute_name", row.institute_name);
      formData.append("date_of_birth", row.date_of_birth);
      formData.append("pan_number", row.pan_number || "");
      formData.append("aadhar_number", row.aadhar_number || "");
      formData.append("institute_full_address", row.institute_full_address);
      formData.append("state", row.state);
      formData.append("district", row.district);
      formData.append("pincode", row.pincode);
      formData.append("contact_number", row.contact_number);
      formData.append("email", row.email);
      formData.append(field, row[field] ? 0 : 1);

      await updateCenter(formData);

      setData((prev) =>
        prev.map((item) =>
          item.id === row.id ? { ...item, [field]: !item[field] } : item,
        ),
      );
      show("success", `${field} updated successfully`);
    } catch (err) {
      show("error", err.message || "Failed to update");
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!target) return;
    try {
      await remove(target.id);
      show("success", `Center "${target.institute_name}" deleted`);
    } catch (err) {
      show("error", "Failed to delete center");
    } finally {
      close();
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

          {/* Active Status Toggle */}
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
      onClick: (row) => open(row),
    },
  ];

  const toolbar = (
    <Button
      onClick={() => navigate("/admin/centers/add")}
      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
    >
      <HiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="hidden sm:inline">Add New Center</span>
      <span className="sm:hidden">Add Center</span>
    </Button>
  );

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-text">
            Center Management
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Manage registered centers and their status
          </p>
        </div>
        <div className="flex-shrink-0">{toolbar}</div>
      </div>

      {/* Table Container */}
      <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
        <Table
          title=""
          columns={columns}
          data={centers}
          actions={actions}
          loading={loading}
          emptyMessage="No centers found. Click 'Add New Center' to get started."
          toolbar={null}
        />
      </div>

      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={close}
              className="w-full sm:w-auto justify-center"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              loading={loading} // Add loading state if you have it
              className="w-full sm:w-auto justify-center gap-2"
            >
              <HiTrash className="w-4 h-4" />
              Delete
            </Button>
          </>
        }
      >
        {target && (
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-danger/10 rounded-full flex items-center justify-center mb-4 shrink-0">
              <HiTrash className="w-7 h-7 sm:w-8 sm:h-8 text-danger" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <p className="text-text text-sm sm:text-base">
                Are you sure you want to delete{" "}
                <strong className="text-primary font-semibold">
                  {target.institute_name}
                </strong>
                ?
              </p>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                This action cannot be undone. All associated data including
                student records and course assignments will be permanently
                removed.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
