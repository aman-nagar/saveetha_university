// src/components/form/FormFileInput.jsx
import { useState } from "react";

export default function FormFileInput({
  label,
  name,
  register,
  accept = "image/*",
  required = false,
  error,
  existingUrl = null, // ← URL of already-saved file from backend
}) {
  // Start with existing URL as the preview if provided
  const [preview, setPreview] = useState(existingUrl || null);
  const [isExisting, setIsExisting] = useState(!!existingUrl);

  const { onChange, ...rest } = register(name, {
    required: required ? "File is required" : false,
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsExisting(false);
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        // Non-image (e.g. PDF) — show filename badge
        setPreview(`__file__:${file.name}`);
      }
    }
    onChange(e);
  };

  const isFileBadge = preview?.startsWith("__file__:");

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-text uppercase tracking-wider">
        {label} {required && "*"}
      </label>

      <div
        className={`flex items-center gap-3 p-2 border rounded-md bg-surface
          ${error ? "border-red-500" : "border-border"}
        `}
      >
        {/* Image preview (existing or newly selected) */}
        {preview && !isFileBadge && (
          <div className="relative flex-shrink-0">
            <img
              src={preview}
              alt="Preview"
              className="h-12 w-12 object-cover rounded border border-border"
            />
            {isExisting && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] px-1 rounded">
                saved
              </span>
            )}
          </div>
        )}

        {/* PDF / non-image badge */}
        {isFileBadge && (
          <div className="flex-shrink-0 px-2 py-1 bg-bg border border-border rounded text-xs text-text-secondary truncate max-w-[120px]">
            📄 {preview.replace("__file__:", "")}
          </div>
        )}

        <input
          type="file"
          accept={accept}
          {...rest}
          onChange={handleChange}
          className="text-sm flex-1"
        />
      </div>

      {/* Existing filename hint */}
      {isExisting && preview && !isFileBadge && (
        <p className="text-[10px] text-text-muted">
          Current file shown above. Select a new file to replace it.
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

