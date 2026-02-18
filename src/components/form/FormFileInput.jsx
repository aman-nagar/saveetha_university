// src/components/form/FormFileInput.jsx
import { useState } from "react";

export default function FormFileInput({
  label,
  name,
  register,
  accept = "image/*",
  required = false,
}) {
  const [preview, setPreview] = useState(null);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text">
        {label} {required && "*"}
      </label>

      <div className="border border-border rounded-lg p-4 bg-surface">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 object-cover rounded-md mb-3 border border-border"
          />
        ) : (
          <div className="h-24 w-24 flex items-center justify-center text-muted border border-dashed border-border rounded-md mb-3">
            No image
          </div>
        )}

        <input
          type="file"
          accept={accept}
          {...register(name, { required })}
          onChange={handlePreview}
          className="text-sm text-text"
        />
      </div>
    </div>
  );
}
