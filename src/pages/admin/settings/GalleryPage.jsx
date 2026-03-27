import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useToast } from "../../../context/ToastContext";
import Toast from "../../../components/ui/Toast";

import {
  fetchGallery,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../../../api/settings/settingAPI";
import GalleryModal from "../../../components/admin/settings/modals/GalleryModal";

export default function GalleryPage() {
  const { toast, show, clear } = useToast();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Load gallery on mount
  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const response = await fetchGallery();
      // Handle both wrapped and unwrapped responses
      let galleryData = [];
      if (Array.isArray(response)) {
        galleryData = response;
      } else if (Array.isArray(response?.data)) {
        galleryData = response.data;
      }

      setGallery(galleryData);
    } catch (err) {
      show("error", err.message || "Failed to load gallery");
      console.error("Error loading gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData) => {
    setUploading(true);
    try {
      const response = await uploadGalleryImage(formData);
      console.log("Upload Response:", response);

      show("success", "Image uploaded successfully");
      setIsModalOpen(false);
      await loadGallery();
    } catch (err) {
      show("error", err.message || "Failed to upload image");
      console.error("Error uploading:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    setDeleting(id);
    try {
      await deleteGalleryImage(id);
      show("success", "Image deleted successfully");
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      show("error", err.message || "Failed to delete image");
      console.error("Error deleting:", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && <Toast {...toast} onClose={clear} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Gallery</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your image gallery
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
        >
          <FaPlus /> Upload Image
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-text-muted">
            Loading gallery...
          </div>
        </div>
      ) : gallery.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">No images in gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition group"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-surface overflow-hidden">
                <img
                  src={item.full_image_url}
                  alt={item.image_name || `Gallery ${item.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                  title="Delete image"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 bg-surface/50">
                <p className="text-xs text-text-muted">
                  Uploaded: {new Date(item.created_at).toLocaleDateString()}
                </p>
                {item.image_name && (
                  <p className="text-sm text-text font-medium truncate mt-1">
                    {item.image_name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
        isLoading={uploading}
      />
    </div>
  );
}
