// src/pages/admin/settings/tabs/SlidersTab.jsx
import { useEffect, useState } from "react";
import {
  fetchSliders,
  createSlider,
  updateSlider,
  deleteSlider,
} from "@/api/settings/settingAPI";
import { useSettingsCrud } from "@/hooks/useSettingsCrud";
import Button from "@/components/ui/Button";
import SliderModal from "@/components/admin/settings/modals/SliderModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";

export default function SlidersTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data, loading, create, update, remove, load } = useSettingsCrud(
    fetchSliders,
    createSlider,
    updateSlider,
    deleteSlider,
    onError,
  );

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem?.id) {
        await update(editingItem.id, formData);
      } else {
        await create(formData);
      }
      onSuccess?.();
      setIsModalOpen(false);
    } catch (err) {
      onError?.(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;
    try {
      await remove(id);
      onSuccess?.();
    } catch (err) {
      onError?.(err.message);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "position", label: "Position", render: (pos) => pos || "-" },
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
      key: "is_active",
      label: "Status",
      render: (active) => (active ? "✅ Active" : "⏳ Inactive"),
    },
  ];

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="bg-primary text-white">
        + Add Slider
      </Button>

      <SettingsTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No sliders yet. Create carousel images."
      />

      <SliderModal
        isOpen={isModalOpen}
        item={editingItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
