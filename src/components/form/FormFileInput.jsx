// src/components/form/FormFileInput.jsx
import { useState } from "react";

export default function FormFileInput({
  label,
  name,
  register,
  accept = "image/*",
  required = false,
  error,
}) {
  const [preview, setPreview] = useState(null);

  const { onChange, ...rest } = register(name, {
    required: required ? "File is required" : false,
  });

  const handlePreview = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }

    onChange(e);
  };

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
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-10 w-10 object-cover rounded border"
          />
        )}

        <input
          type="file"
          accept={accept}
          {...rest}
          onChange={handlePreview}
          className="text-sm"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
