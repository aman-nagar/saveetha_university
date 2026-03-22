// src/pages/admin/settings/tabs/SlidersTab.jsx
import { useEffect, useState } from "react";
import {
  fetchSliders,
  createSlider,
  updateSliderStatus,
  deleteSlider,
} from "@/api/settings/settingAPI";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import SliderModal from "@/components/admin/settings/modals/SliderModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";
import { useToast } from "../../../../context/ToastContext";

export default function SlidersTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const loadSliders = async () => {
    try {
      setLoading(true);
      const response = await fetchSliders();
      const sliderData = Array.isArray(response)
        ? response
        : response?.sliders || response || [];

      setData(sliderData);
    } catch (err) {
      show("error", "Failed to load sliders");
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      await createSlider(formData);
      show("success", "Slider created successfully");
      onSuccess?.();
      setIsModalOpen(false);
      loadSliders();
    } catch (err) {
      show("error", err.message);
      onError?.(err.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setData((prevData) =>
        prevData.map((slider) =>
          slider.id === id
            ? { ...slider, status: !currentStatus ? 1 : 0 }
            : slider,
        ),
      );

      await updateSliderStatus(id, !currentStatus);
      show("success", "Status updated successfully");
      onSuccess?.();
    } catch (err) {
      // Revert on error
      loadSliders();
      show("error", err.message);
      onError?.(err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      setData((prevData) =>
        prevData.filter((slider) => slider.id !== deleteConfirmId),
      );

      await deleteSlider(deleteConfirmId);
      show("success", "Slider deleted successfully");
      onSuccess?.();
      setDeleteConfirmOpen(false);
      setDeleteConfirmId(null);
    } catch (err) {
      // Revert on error
      loadSliders();
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
    { key: "heading", label: "Heading" },
    { key: "title", label: "Title" },
    {
      key: "image_url",
      label: "Image",
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="slider"
            className="h-8 w-12 object-cover rounded"
          />
        ) : (
          "-"
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (status, row) => (
        <button
          onClick={() => handleToggleStatus(row.id, status === 1)}
          className="p-2 rounded transition-all hover:bg-accent/20"
          title={status === 1 ? "Active" : "Inactive"}
        >
          {status === 1 ? (
            <FaToggleOn size={20} className="text-green-500" />
          ) : (
            <FaToggleOff size={20} className="text-gray-400" />
          )}
        </button>
      ),
    },
  ];

  const handleTableDelete = (id) => {
    handleDelete(id);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="bg-primary text-white">
        + Add Slider
      </Button>

      <SettingsTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={() => {}} // Disabled - no edit
        onDelete={handleTableDelete}
        hideEdit={true}
        emptyMessage="No sliders yet. Create carousel images."
      />

      <SliderModal
        isOpen={isModalOpen}
        item={null}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreate}
      />

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
            Are you sure you want to delete this slider? This action cannot be
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
