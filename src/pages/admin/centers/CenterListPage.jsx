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
      // Placeholder for delete API
      console.log(`[CenterListPage.jsx] Delete ID: ${id}`);
    },
  });

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = async (row, field) => {
    try {
      setTogglingId(row.id);
      // Prepare form data with all required fields
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
      // Add the toggled field with opposite value
      formData.append(field, row[field] ? 0 : 1);
      // If there's an existing image, we could send it, but backend may keep it if not sent
      // Optional: send owner_image if exists, but not required

      await updateCenter(formData);

      // Update local state optimistically
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
      render: (_, i) => <span className="text-muted">{i + 1}</span>,
    },
    {
      key: "institute_name",
      label: "Institute Name",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-text">{row.institute_name}</span>
          <span className="text-xs text-muted">
            {row.institute_full_address}
          </span>
        </div>
      ),
    },
    {
      key: "institute_owner_name",
      label: "Owner Detail",
      render: (row) => (
        <div className="flex flex-col">
          <span>{row.institute_owner_name}</span>
          <span className="text-xs text-muted">DOB: {row.date_of_birth}</span>
        </div>
      ),
    },
    {
      key: "contact_number",
      label: "Contact & Email",
      render: (row) => (
        <div className="flex flex-col text-sm">
          <span>{row.contact_number}</span>
          <span className="text-blue-500 hover:underline">{row.email}</span>
        </div>
      ),
    },
    {
      key: "is_form_enabled",
      label: "Form Enabled",
      render: (row) => (
        <button
          onClick={() => handleToggle(row, "is_form_enabled")}
          disabled={togglingId === row.id}
          className="flex items-center gap-2 focus:outline-none"
        >
          {togglingId === row.id ? (
            <FaSpinner className="animate-spin text-primary" />
          ) : row.is_form_enabled ? (
            <FaToggleOn className="w-6 h-6 text-green-600" />
          ) : (
            <FaToggleOff className="w-6 h-6 text-gray-400" />
          )}
          <span className="text-sm">{row.is_form_enabled ? "Yes" : "No"}</span>
        </button>
      ),
    },
    {
      key: "is_active",
      label: "Active Status",
      render: (row) => (
        <button
          onClick={() => handleToggle(row, "is_active")}
          disabled={togglingId === row.id}
          className="flex items-center gap-2 focus:outline-none"
        >
          {togglingId === row.id ? (
            <FaSpinner className="animate-spin text-primary" />
          ) : row.is_active ? (
            <FaToggleOn className="w-6 h-6 text-green-600" />
          ) : (
            <FaToggleOff className="w-6 h-6 text-gray-400" />
          )}
          <span className="text-sm">
            {row.is_active ? "Active" : "Inactive"}
          </span>
        </button>
      ),
    },
  ];

  const actions = [
    {
      icon: <HiPencil className="w-4 h-4" />,
      className:
        "bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition",
      title: "Edit Center",
      onClick: (row) => navigate(`/admin/centers/add?id=${row.id}`),
    },
    {
      icon: <HiTrash className="w-4 h-4" />,
      className:
        "bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-md transition",
      title: "Delete Center",
      onClick: (row) => open(row),
    },
  ];

  const toolbar = (
    <Button
      onClick={() => navigate("/admin/centers/add")}
      className="flex items-center gap-2"
    >
      <HiPlus className="w-4 h-4" />
      Add New Center
    </Button>
  );

  return (
    <div className="w-full">
      {toast && <Toast {...toast} onClose={clear} />}
      <div className="bg-surface rounded-xl shadow-sm border border-border">
        <Table
          title="All Registered Centers"
          columns={columns}
          data={centers}
          actions={actions}
          loading={loading}
          emptyMessage="No centers found. Click 'Add New Center' to get started."
          toolbar={toolbar}
        />
      </div>
      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Center
            </Button>
          </>
        }
      >
        {target && (
          <p className="text-text">
            Are you sure you want to delete{" "}
            <strong>{target.institute_name}</strong>? This action cannot be
            undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
