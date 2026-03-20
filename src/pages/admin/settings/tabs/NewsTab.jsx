// src/pages/admin/settings/tabs/NewsTab.jsx
import { useEffect, useState } from "react";
import {
  fetchNews,
  createNews,
  updateNews,
  deleteNews,
} from "@/api/settings/settingAPI";
import { useSettingsCrud } from "@/hooks/useSettingsCrud";
import Button from "@/components/ui/Button";
import NewsModal from "@/components/admin/settings/modals/NewsModal";
import SettingsTable from "@/components/admin/settings/SettingsTable";

export default function NewsTab({ onSuccess, onError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data, loading, create, update, remove, load } = useSettingsCrud(
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
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
    if (!window.confirm("Delete this news?")) return;
    try {
      await remove(id);
      onSuccess?.();
    } catch (err) {
      onError?.(err.message);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "content",
      label: "Content",
      render: (content) => (content ? content.substring(0, 50) + "..." : "-"),
    },
    {
      key: "publish_date",
      label: "Date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "is_published",
      label: "Status",
      render: (published) => (published ? "✅ Published" : "⏳ Draft"),
    },
  ];

  return (
    <div className="space-y-4">
      <Button onClick={handleAdd} className="bg-primary text-white">
        + Add News
      </Button>

      <SettingsTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No news yet. Create your first news update."
      />

      <NewsModal
        isOpen={isModalOpen}
        item={editingItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
