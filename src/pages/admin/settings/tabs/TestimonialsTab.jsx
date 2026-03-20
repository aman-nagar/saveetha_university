// src/pages/admin/settings/tabs/TestimonialsTab.jsx
import { useEffect, useState } from "react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/api/settings/settingAPI";
import { useSettingsCrud } from "@/hooks/useSettingsCrud";
import Button from "@/components/ui/Button";
import TestimonialModal from "@/components/admin/settings/modals/TestimonialModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";

export default function TestimonialsTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data, loading, create, update, remove, load } = useSettingsCrud(
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
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
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await remove(id);
      onSuccess?.();
    } catch (err) {
      onError?.(err.message);
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    {
      key: "message",
      label: "Message",
      render: (msg) => (msg ? msg.substring(0, 50) + "..." : "-"),
    },
    { key: "rating", label: "Rating", render: (rating) => `${rating || 0}/5` },
  ];

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="bg-primary text-white">
        + Add Testimonial
      </Button>

      <SettingsTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No testimonials yet. Add one to get started."
      />

      <TestimonialModal
        isOpen={isModalOpen}
        item={editingItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
