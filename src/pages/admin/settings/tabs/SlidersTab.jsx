// src/pages/admin/settings/tabs/SlidersTab.jsx
import { useEffect, useState } from "react";
import {
  fetchSliders,
  createSlider,
  updateSliderStatus,
  deleteSlider,
} from "@/api/settings/settingAPI";

import Button from "@/components/ui/Button";
import SliderModal from "@/components/admin/settings/modals/SliderModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";
import { useToast } from "../../../../context/ToastContext";

export default function SlidersTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const loadSliders = async () => {
    try {
      setLoading(true);
      const response = await fetchSliders();
      console.log(response);
      setData(response?.data || []);
    } catch (err) {
      showToast("Failed to load sliders", "error");
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
      showToast("Slider created successfully", "success");
      onSuccess?.();
      setIsModalOpen(false);
      loadSliders();
    } catch (err) {
      showToast(err.message, "error");
      onError?.(err.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateSliderStatus(id, !currentStatus);
      showToast("Status updated successfully", "success");
      onSuccess?.();
      loadSliders();
    } catch (err) {
      showToast(err.message, "error");
      onError?.(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;
    try {
      await deleteSlider(id);
      showToast("Slider deleted successfully", "success");
      onSuccess?.();
      loadSliders();
    } catch (err) {
      showToast(err.message, "error");
      onError?.(err.message);
    }
  };

  const columns = [
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
          className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
          style={{
            backgroundColor: status === 1 ? "#10b98133" : "#ef444433",
            color: status === 1 ? "#10b981" : "#ef4444",
          }}
        >
          {status === 1 ? "✅ Active" : "⏳ Inactive"}
        </button>
      ),
    },
  ];

  // Modify onDelete to only accept ID in SettingsTable
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
        emptyMessage="No sliders yet. Create carousel images."
      />

      <SliderModal
        isOpen={isModalOpen}
        item={null}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
