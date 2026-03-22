// src/pages/admin/settings/tabs/DownloadFormsTab.jsx
import { useEffect, useState } from "react";
import {
  fetchDownloadForms,
  createDownloadForm,
  deleteDownloadForm,
} from "@/api/settings/settingAPI";
import { FaFile } from "react-icons/fa";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import DownloadFormModal from "@/components/admin/settings/modals/DownloadFormModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";
import { useToast } from "../../../../context/ToastContext";

export default function DownloadFormsTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const loadForms = async () => {
    try {
      setLoading(true);
      const response = await fetchDownloadForms();
      const formsData = Array.isArray(response)
        ? response
        : response?.forms || response || [];

      setData(formsData);
    } catch (err) {
      show("error", "Failed to load forms");
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      await createDownloadForm(formData);
      show("success", "Form created successfully");
      onSuccess?.();
      setIsModalOpen(false);
      loadForms();
    } catch (err) {
      show("error", err.message);
      onError?.(err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      setData((prevData) =>
        prevData.filter((form) => form.id !== deleteConfirmId),
      );

      await deleteDownloadForm(deleteConfirmId);
      show("success", "Form deleted successfully");
      onSuccess?.();
      setDeleteConfirmOpen(false);
      setDeleteConfirmId(null);
    } catch (err) {
      // Revert on error
      loadForms();
      show("error", err.message);
      onError?.(err.message);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirmId(id);
    setDeleteConfirmOpen(true);
  };

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_, __, index) => (
        <span className="font-semibold">{index + 1}</span>
      ),
    },
    { key: "name", label: "Form Name" },
    {
      key: "file",
      label: "File",
      render: (fileUrl) =>
        fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <FaFile className="w-4 h-4" />
            <span className="text-xs underline">Download</span>
          </a>
        ) : (
          <span className="text-muted text-xs">No file</span>
        ),
    },
    {
      key: "created_at",
      label: "Created",
      render: (date) => (
        <span className="text-xs text-muted">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const handleTableDelete = (id) => {
    handleDelete(id);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="bg-primary text-white">
        + Add Form
      </Button>

      <SettingsTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={() => {}} // Disabled - no edit
        onDelete={handleTableDelete}
        hideEdit={true}
        emptyMessage="No forms yet. Create downloadable form formats."
      />

      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreate}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setDeleteConfirmId(null);
        }}
        title="Confirm Delete"
      >
        <div className="space-y-6">
          <p className="text-text">
            Are you sure you want to delete this form? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setDeleteConfirmOpen(false);
                setDeleteConfirmId(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
