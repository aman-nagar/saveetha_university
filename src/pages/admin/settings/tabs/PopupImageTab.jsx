// src/pages/admin/settings/tabs/PopupImageTab.jsx
import { useEffect, useRef, useState } from "react";
import { fetchPopupImage, uploadPopupImage } from "@/api/settings/settingAPI";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import {
  FaImage,
  FaUpload,
  FaCheckCircle,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

export default function PopupImageTab() {
  const { show } = useToast();
  const fileInputRef = useRef(null);

  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);


  // Load current popup image on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchPopupImage();
        // apiRequest unwraps json.data, so res = { id, title, image_path, is_active, full_image_url }
        setCurrentImageUrl(res?.full_image_url || null);
        setIsActive(res?.is_active === 1 || res?.is_active === true);
      } catch (err) {
        console.warn("No popup image found:", err.message);
        setCurrentImageUrl(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      show("error", "Please select a valid image file (JPG, PNG, WebP, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      show("error", "Image must be smaller than 5 MB");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await uploadPopupImage(formData);
      const newUrl = res?.full_image_url || null;
      const newActive = res?.is_active === 1 || res?.is_active === true;

      if (newUrl) {
        setCurrentImageUrl(newUrl);
        setIsActive(newActive);
      }
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      show("success", "Popup image updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      show("error", err.message || "Failed to upload popup image");
    } finally {
      setUploading(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Section header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
          <FaImage className="text-primary" size={18} />
        </div>
        <div>
          <h2 className="text-base font-bold text-text">Popup / Announcement Image</h2>
          <p className="text-xs text-muted mt-0.5 leading-relaxed">
            Upload an image to display inside the homepage announcement popup.
            The image replaces any hard-coded text content. Recommended size: <strong>600×800px</strong> or similar portrait format.
          </p>
        </div>
      </div>

      {/* Current image */}
      <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text">Current Popup Image</h3>
          {!loading && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                isActive
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-muted/10 text-muted border border-muted/20"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-success" : "bg-muted"}`} />
              {isActive ? "Active — Visible on site" : "Inactive — Hidden"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-muted gap-2">
            <FaSpinner className="animate-spin" size={18} />
            <span className="text-sm">Loading...</span>
          </div>
        ) : currentImageUrl ? (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-border bg-bg max-w-xs">
              <img
                src={currentImageUrl}
                alt="Current popup image"
                className="w-full object-contain max-h-72"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="hidden h-48 items-center justify-center text-muted text-xs flex-col gap-2"
              >
                <FaImage size={28} className="opacity-40" />
                <span>Image failed to load</span>
              </div>
            </div>
            <a
              href={currentImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <MdOpenInNew size={13} />
              Open full image
            </a>
          </div>
        ) : (
          <div className="h-36 flex flex-col items-center justify-center rounded-xl border border-dashed border-border text-muted gap-2">
            <FaImage size={28} className="opacity-30" />
            <p className="text-sm font-medium">No popup image uploaded yet</p>
            <p className="text-xs opacity-60">The popup will be hidden until an image is uploaded.</p>
          </div>
        )}
      </div>

      {/* Upload new image */}
      <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-text">Upload New Image</h3>

        {/* File picker */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative h-40 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-bg hover:bg-primary/3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <FaUpload size={22} className="text-muted group-hover:text-primary transition-colors" />
          <p className="text-sm font-medium text-muted group-hover:text-text transition-colors">
            Click to select image
          </p>
          <p className="text-xs text-muted/60">JPG, PNG, WebP — max 5 MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Preview of newly selected file */}
        {preview && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text">New image preview</span>
              <button
                onClick={handleClearSelection}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-danger transition-colors"
              >
                <FaTrash size={11} />
                Clear
              </button>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border bg-bg max-w-xs">
              <img
                src={preview}
                alt="Preview"
                className="w-full object-contain max-h-72"
              />
              {/* Overlay badge */}
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-warning/90 text-slate-900 uppercase tracking-wide">
                New
              </span>
            </div>
            <p className="text-xs text-muted">
              <span className="font-medium text-text">{selectedFile?.name}</span>{" "}
              ({(selectedFile?.size / 1024).toFixed(1)} KB)
            </p>
          </div>
        )}

        {/* Upload button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="flex items-center gap-2 text-sm bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin" size={14} />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <FaCheckCircle size={14} />
              <span>Save Popup Image</span>
            </>
          )}
        </Button>
      </div>

      {/* Info note */}
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 text-xs text-muted leading-relaxed">
        <strong className="text-text">Note:</strong> After uploading, the homepage popup will automatically
        display this image instead of any text content. The popup appears to all visitors when
        they load the homepage. To remove the popup entirely, contact the developer.
      </div>
    </div>
  );
}
